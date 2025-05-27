from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


class User(AbstractUser):
    phone = models.CharField(_('phone number'), max_length=15, blank=True)
    birth_date = models.DateField(_('birth date'), null=True, blank=True)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)

    def __str__(self):
        return f"Feedback from {self.name} ({self.email})"

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car_model = models.CharField(max_length=100)  # Название модели автомобиля
    value = models.SmallIntegerField()  # 1 - like, -1 - dislike
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'car_model')  # Один пользователь - одна оценка на модель