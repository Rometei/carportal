function validateForm() {
    let isValid = true;

    // Валидация имени
    const firstName = document.getElementById('{{ form.first_name.id_for_label }}');
    const firstNameError = document.getElementById('firstNameError');
    if (!/^[A-ZА-Я][a-zа-я]*$/.test(firstName.value)) {
        firstNameError.textContent = 'Имя должно начинаться с заглавной буквы и содержать только буквы.';
        firstNameError.style.display = 'block';
        isValid = false;
    } else {
        firstNameError.style.display = 'none';
    }

    // Валидация фамилии
    const lastName = document.getElementById('{{ form.last_name.id_for_label }}');
    const lastNameError = document.getElementById('lastNameError');
    if (!/^[A-ZА-Я][a-zа-я]*$/.test(lastName.value)) {
        lastNameError.textContent = 'Фамилия должна начинаться с заглавной буквы и содержать только буквы.';
        lastNameError.style.display = 'block';
        isValid = false;
    } else {
        lastNameError.style.display = 'none';
    }

    // Валидация email
    const email = document.getElementById('{{ form.email.id_for_label }}');
    const emailError = document.getElementById('emailError');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Введите корректный email.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    return isValid;
}

function validateFeedbackForm() {
    let isValid = true;

    // Валидация имени
    const firstName = document.getElementById('firstName');
    const firstNameError = document.getElementById('firstNameError');
    if (!/^[A-ZА-Я][a-zа-я]*$/.test(firstName.value)) {
        firstNameError.textContent = 'Имя должно начинаться с заглавной буквы и содержать только буквы.';
        firstNameError.style.display = 'block';
        isValid = false;
    } else {
        firstNameError.style.display = 'none';
    }
        // Валидация имени
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!/^[A-ZА-Я][a-zа-я]*$/.test(name.value)) {
        nameError.textContent = 'Имя должно начинаться с заглавной буквы и содержать только буквы.';
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Валидация фамилии
    const lastName = document.getElementById('lastName');
    const lastNameError = document.getElementById('lastNameError');
    if (!/^[A-ZА-Я][a-zа-я]*$/.test(lastName.value)) {
        lastNameError.textContent = 'Фамилия должна начинаться с заглавной буквы и содержать только буквы.';
        lastNameError.style.display = 'block';
        isValid = false;
    } else {
        lastNameError.style.display = 'none';
    }

    // Валидация email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Введите корректный email.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Валидация текста сообщения
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.length < 10) {
        messageError.textContent = 'Сообщение должно содержать не менее 10 символов.';
        messageError.style.display = 'block';
        isValid = false;
    } else if (message.value.length > 500) {
        messageError.textContent = 'Сообщение не должно превышать 500 символов.';
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.style.display = 'none';
    }

    return isValid;
}

function validateRegistrationForm() {
    let isValid = true;

    // Валидация логина
    const username = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    if (username.value.length < 3) {
        usernameError.textContent = 'Логин должен содержать минимум 3 символа';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }

    // Валидация имени
    const firstName = document.getElementById('first_name');
    const firstNameError = document.getElementById('firstNameError');
    if (!/^[A-ZА-Я][a-zа-я]*$/.test(firstName.value)) {
        firstNameError.textContent = 'Имя должно начинаться с заглавной буквы и содержать только буквы';
        firstNameError.style.display = 'block';
        isValid = false;
    } else {
        firstNameError.style.display = 'none';
    }

    // Валидация фамилии
    const lastName = document.getElementById('last_name');
    const lastNameError = document.getElementById('lastNameError');
    if (!/^[A-ZА-Я][a-zа-я]*$/.test(lastName.value)) {
        lastNameError.textContent = 'Фамилия должна начинаться с заглавной буквы и содержать только буквы';
        lastNameError.style.display = 'block';
        isValid = false;
    } else {
        lastNameError.style.display = 'none';
    }

    // Валидация email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Введите корректный email';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Валидация пароля
    const password1 = document.getElementById('password1');
    const password1Error = document.getElementById('password1Error');
    if (password1.value.length < 6) {
        password1Error.textContent = 'Пароль должен содержать минимум 6 символов';
        password1Error.style.display = 'block';
        isValid = false;
    } else {
        password1Error.style.display = 'none';
    }

    // Подтверждение пароля
    const password2 = document.getElementById('password2');
    const password2Error = document.getElementById('password2Error');
    if (password1.value !== password2.value) {
        password2Error.textContent = 'Пароли не совпадают';
        password2Error.style.display = 'block';
        isValid = false;
    } else {
        password2Error.style.display = 'none';
    }

    return isValid;
}
document.addEventListener('DOMContentLoaded', function() {
    // Функция для получения CSRF токена
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Функция обновления рейтинга
    function updateRating(model) {
        fetch(`/likes/${encodeURIComponent(model)}/`)
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(data => {
                const container = document.querySelector(`.rating-container[data-model="${model}"]`);
                if (container) {
                    container.querySelector('.like-count').textContent = data.likes;
                    container.querySelector('.dislike-count').textContent = data.dislikes;
                    container.querySelector('.total-rating').textContent = data.total;

                    container.querySelector('.like-btn').classList.toggle('active', data.user_vote === 1);
                    container.querySelector('.dislike-btn').classList.toggle('active', data.user_vote === -1);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    document.addEventListener('click', function(e) {
        const likeBtn = e.target.closest('.like-btn');
        const dislikeBtn = e.target.closest('.dislike-btn');

        if (likeBtn || dislikeBtn) {
            e.preventDefault();
            const button = likeBtn || dislikeBtn;
            const container = button.closest('.rating-container');
            const model = container.dataset.model;
            const value = parseInt(button.dataset.value);

            fetch('/like/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    car_model: model,
                    value: value
                })
            })
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    updateRating(model);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });

    // Инициализация рейтингов
    document.querySelectorAll('.rating-container').forEach(container => {
        updateRating(container.dataset.model);
    });
});
