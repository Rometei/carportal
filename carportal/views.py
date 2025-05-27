from django.shortcuts import render, redirect
from .forms import FeedbackForm, RegistrationForm, LoginForm
from carportal.models import Feedback, Like, User
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.core.management import call_command
from django.http import HttpResponse
from django.db import connection
import json
import requests

def check_db(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            return HttpResponse("PostgreSQL подключена успешно!")
    except Exception as e:
        return HttpResponse(f"Ошибка подключения: {str(e)}", status=500)

def migrate_view(request):
    call_command('migrate')
    return HttpResponse("Миграции применены")

def registration(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            print(f"User created: {user.username}")  # Отладочная печать
            login(request, user)
            return redirect('index')
        else:
            print(form.errors)  # Печать ошибок формы
    else:
        form = RegistrationForm()
    return render(request, 'registration.html', {'form': form})

# Create your views here.
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def models(request):
    return render(request, 'models.html')

def contact(request):
    return render(request, 'contact.html')

def feedback(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            feedback = Feedback.objects.create(
                user=request.user if request.user.is_authenticated else None,
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                message=form.cleaned_data['message']
            )

            # Отправка сообщения в Telegram
            bot_token = '8026359071:AAF1Ph27WTAv1E-yB3vhyvdOcepPI1ZUxXo'
            chat_id = '1318818305'
            text = f"Новое сообщение от {feedback.name} ({feedback.email}):\n{feedback.message}"
            url = f"https://api.telegram.org/bot{bot_token}/sendMessage?chat_id={chat_id}&text={text}"
            requests.get(url)

            return redirect('success')  # Перенаправление на страницу успеха
    else:
        form = FeedbackForm()
    return render(request, 'feedback.html', {'form': form})

def success(request):
    return render(request, 'success.html')


@require_POST
@login_required
def like_dislike(request):
    try:
        data = json.loads(request.body)
        car_model = data.get('car_model')
        value = data.get('value')

        # Проверка условий
        if not car_model:
            return JsonResponse({'status': 'error', 'message': 'Model is required'}, status=400)

        if value not in (-1, 0, 1):
            return JsonResponse({'status': 'error', 'message': 'Invalid value'}, status=400)

        # Удаляем предыдущий голос пользователя
        Like.objects.filter(user=request.user, car_model=car_model).delete()

        # Создаем новый голос (если value не 0)
        if value != 0:
            Like.objects.create(user=request.user, car_model=car_model, value=value)

        # Получаем актуальные данные
        likes = Like.objects.filter(car_model=car_model, value=1).count()
        dislikes = Like.objects.filter(car_model=car_model, value=-1).count()

        return JsonResponse({
            'status': 'ok',
            'likes': likes,
            'dislikes': dislikes,
            'total': likes - dislikes,
            'user_vote': value if value != 0 else 0
        })
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def get_likes(request, car_model):
    likes = Like.objects.filter(car_model=car_model, value=1).count()
    dislikes = Like.objects.filter(car_model=car_model, value=-1).count()

    user_vote = 0
    if request.user.is_authenticated:
        try:
            user_vote = Like.objects.get(user=request.user, car_model=car_model).value
        except Like.DoesNotExist:
            pass

    return JsonResponse({
        'likes': likes,
        'dislikes': dislikes,
        'total': likes - dislikes,
        'user_vote': user_vote
    })

def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'login.html', {'error': 'Неверный логин или пароль'})
    return render(request, 'login.html')

@login_required
def user_logout(request):
    logout(request)
    return redirect('index')