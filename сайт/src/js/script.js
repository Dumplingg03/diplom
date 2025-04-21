// Функция для проверки авторизации и изменения кнопки
function updateAuthButton() {
    const authButton = document.querySelector('.auth-button');
    const logoutButton = document.querySelector('.logout-button');
    if (authButton) {
        const token = localStorage.getItem('token');
        if (token) {
            authButton.textContent = 'Профиль';
            authButton.href = 'profile.html'
            if (logoutButton) {
                logoutButton.classList.add('visible');
            }
            // Если мы на странице авторизации, перенаправляем на главную
            if (window.location.pathname.includes('auth.html')) {
                window.location.href = 'index.html';
            }
        } else {
            authButton.textContent = 'Авторизация';
            if (logoutButton) {
                logoutButton.classList.remove('visible');
            }
        }
    }
}

// Функция для выхода из аккаунта
function logout() {
    localStorage.removeItem('token');
    updateAuthButton();
    window.location.href = 'index.html';
}

// Добавляем обработчик клика на кнопку профиля и кнопку выхода
document.addEventListener('DOMContentLoaded', function() {
    
    const logoutButton = document.querySelector('.logout-button');
    
    
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', updateAuthButton);

// Также обновляем кнопку при изменении localStorage
window.addEventListener('storage', function(e) {
    if (e.key === 'token') {
        updateAuthButton();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы табов и все карточки курсов
    const tabs = document.querySelectorAll('.tab');
    const courseCards = document.querySelectorAll('.course-card');
    
    // Группируем карточки по категориям
    const coursesByCategory = {
        'new': Array.from(courseCards).slice(0, 3), // Первые 3 - новые
        'packages': Array.from(courseCards).slice(3, 6), // Следующие 3 - пакеты
        'discounts': Array.from(courseCards).slice(6, 9), // Затем скидки
        'featured': Array.from(courseCards).slice(9, 12) // Последние - наш выбор
    };
    
    // Функция для переключения табов
    function switchTab(category) {
        // Удаляем активный класс у всех табов
        tabs.forEach(tab => {
            tab.classList.remove('active');
            // Удаляем атрибут style, если он был добавлен
            tab.removeAttribute('style');
        });
        
        // Добавляем активный класс выбранному табу
        const activeTab = Array.from(tabs).find(tab => {
            const tabText = tab.textContent.toLowerCase();
            if (category === 'new') return tabText.includes('новые');
            if (category === 'packages') return tabText.includes('пакеты');
            if (category === 'discounts') return tabText.includes('скидки');
            if (category === 'featured') return tabText.includes('выбор');
            return false;
        });
        
        if (activeTab) {
            activeTab.classList.add('active');
            // Добавляем подчеркивание
            activeTab.style.borderBottom = '2px solid #333';
           
        }
        
        // Скрываем все карточки
        courseCards.forEach(card => {
            card.classList.add('hidden');
            card.style.display = 'none';
        });
        
        // Показываем только карточки выбранной категории
        coursesByCategory[category].forEach(card => {
            card.classList.remove('hidden');
            card.style.display = 'flex';
        });
    }
    
    // Обработчики кликов для табов
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabText = this.textContent.toLowerCase();
            
            if (tabText.includes('новые')) {
                switchTab('new');
            } else if (tabText.includes('пакеты')) {
                switchTab('packages');
            } else if (tabText.includes('скидки')) {
                switchTab('discounts');
            } else if (tabText.includes('выбор')) {
                switchTab('featured');
            }
        });
    });
    
    // По умолчанию показываем "Новые" курсы
    switchTab('new');
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все уроки
    const lessons = document.querySelectorAll('.module-lessons .lesson');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.course-progress');
    
    // Считаем общее количество уроков
    const totalLessons = lessons.length;
    let completedLessons = 0;
    
    // Функция для обновления прогресса
    function updateProgress() {
        // Считаем завершенные уроки
        completedLessons = document.querySelectorAll('.module-lessons .lesson.completed').length;
        
        // Рассчитываем процент
        const progressPercent = Math.round((completedLessons / totalLessons) * 100);
        
        // Обновляем прогресс-бар
        progressFill.style.width = progressPercent + '%';
        
        // Обновляем текст прогресса
        progressText.textContent = `Прогресс: ${progressPercent}%`;
    }
    
    // Обработчик клика по уроку (для демонстрации)
    lessons.forEach(lesson => {
        lesson.addEventListener('click', function() {
            if (!this.classList.contains('completed')) {
                this.classList.add('completed');
                updateProgress();
            }
        });
    });
    
    // Инициализация прогресса
    updateProgress();
});

// Данные о курсах
const coursesData = {
    'Веб-разработка с нуля': {
        image: '/src/img/web-course.jpg',
        author: 'Иванов И.И.',
        price: '1500 ₽',
        skills: [
            'Основы HTML и CSS',
            'JavaScript и DOM',
            'Адаптивная верстка',
            'Работа с Git',
            'Основы веб-дизайна'
        ]
    },
    'Python для начинающих': {
        image: '/src/img/python.jpg',
        author: 'Петров П.П.',
        price: '1200 ₽',
        skills: [
            'Основы Python',
            'Работа с данными',
            'ООП в Python',
            'Работа с файлами',
            'Основы алгоритмов'
        ]
    },
    'Дизайн интерфейсов': {
        image: '/src/img/design.jpg',
        author: 'Сидорова С.С.',
        price: '1800 ₽',
        skills: [
            'Основы UI/UX',
            'Работа в Figma',
            'Типографика',
            'Цветовая теория',
            'Прототипирование'
        ]
    },
    'JavaScript продвинутый': {
        image: '/src/img/javascript.jpg',
        author: 'Александров А.А.',
        price: '1500 ₽',
        skills: [
            'Замыкания и контексты выполнения',
            'Асинхронность: Promise, async/await',
            'Работа с DOM и событиями',
            'Модули и сборщики (Webpack, Vite)',
            'Оптимизация производительности'
        ]
        
    },
    'React.js с нуля': {
        image: '/src/img/react.jpg',
        author: 'Борисов Б.Б.',
        price: '1800 ₽',
        skills: [
            'JSX и компоненты',
            'Работа с состоянием (useState, useEffect)',
            'React Router',
            'Подключение API',
            'Стилизация компонентов'
        ]
    },
    'Node.js для начинающих': {
        image: '/src/img/nodejs.jpg',
        author: 'Васильев В.В.',
        price: '1200 ₽',
        skills: [
            'Основы Node.js',
            'Работа с модулями',
            'Создание серверов (Express)',
            'Работа с файлами и потоками',
            'Подключение к базам данных'
        ]
    },
    
};

// ID курсов для API
const courseIds = {
    "Веб-разработка с нуля": "661a15e899ac34f12ce9477a",
    "Python для начинающих": "661a15e899ac34f12ce9477b",
    "Дизайн интерфейсов": "661a15e899ac34f12ce9477c",
    "JavaScript продвинутый": "661a15e899ac34f12ce9477d",
    "React.js с нуля": "661a15e899ac34f12ce9477e",
    "Node.js для начинающих": "661a15e899ac34f12ce9477f",
    "UI/UX дизайн": "661a15e899ac34f12ce9477g",
    "DevOps практика": "661a15e899ac34f12ce9477h",
    "Тестирование ПО": "661a15e899ac34f12ce9477j"
    // Добавь остальные по аналогии
    // После добавления курсов, добавь их в seedCourses.js
};

// Получаем элементы модального окна
const modal = document.getElementById('coursePreviewModal');
const closeButton = document.querySelector('.close-modal');

// Функция для проверки записи на курс
async function checkEnrollment(courseId) {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch(`http://localhost:5000/api/enroll/check/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.isEnrolled;
    } catch (err) {
        console.error("Ошибка при проверке записи:", err);
        return false;
    }
}

// Функция для обновления состояния кнопки
function updateEnrollButton(button, isEnrolled) {
    if (isEnrolled) {
        button.textContent = 'Вы уже записаны';
        button.classList.add('enrolled');
        button.disabled = true;
        button.style.backgroundColor = '#cccccc';
        button.style.cursor = 'not-allowed';
    } else {
        // Сбрасываем состояние кнопки, если пользователь не записан
        button.textContent = 'Записаться на курс';
        button.classList.remove('enrolled');
        button.disabled = false;
        button.style.backgroundColor = '#4CAF50';
        button.style.cursor = 'pointer';
    }
}

// Обновляем функцию openModal
async function openModal(courseTitle) {
    const course = coursesData[courseTitle];
    if (course) {
        document.getElementById('previewCourseImage').src = course.image;
        document.getElementById('previewCourseTitle').textContent = courseTitle;
        document.getElementById('previewCourseAuthor').textContent = course.author;
        document.getElementById('previewCoursePrice').textContent = course.price;
        
        const skillsList = document.getElementById('previewCourseSkills');
        skillsList.innerHTML = '';
        course.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // Проверяем запись на курс
        const courseId = courseIds[courseTitle];
        if (courseId) {
            const isEnrolled = await checkEnrollment(courseId);
            const enrollButton = document.querySelector('.enroll-button');
            updateEnrollButton(enrollButton, isEnrolled);
        } else {
            // Если courseId не найден, сбрасываем состояние кнопки
            const enrollButton = document.querySelector('.enroll-button');
            updateEnrollButton(enrollButton, false);
        }
        
        modal.classList.add('active');
    }
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('active');
}

// Добавляем обработчики событий после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    // Добавляем обработчики событий для карточек курсов
    courseCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const courseTitle = card.querySelector('.course-title').textContent;
            openModal(courseTitle);
        });
    });
    
    // Добавляем обработчики для закрытия модального окна
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Закрытие модального окна при клике вне его области
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Закрытие модального окна при нажатии клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Функция для создания и отображения модального окна авторизации
function showAuthRequiredModal() {
    const modal = document.createElement('div');
    modal.className = 'auth-required-modal';
    modal.innerHTML = `
        <div class="auth-required-modal-content">
            <h3>Требуется авторизация</h3>
            <p>Для записи на курс необходимо авторизоваться</p>
            <div class="auth-required-modal-buttons">
                <button class="auth-required-modal-button" onclick="window.location.href='auth.html'">Войти</button>
                <button class="auth-required-modal-button" onclick="window.location.href='registration.html'">Зарегистрироваться</button>
                <button class="auth-required-modal-button" onclick="closeAuthRequiredModal()">Отмена</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Функция для закрытия модального окна авторизации
function closeAuthRequiredModal() {
    const modal = document.querySelector('.auth-required-modal');
    if (modal) {
        modal.remove();
    }
}



// Запись на курсы
document.addEventListener('DOMContentLoaded', function() {
    const enrollButtons = document.querySelectorAll('.enroll-button');

    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();

            const token = localStorage.getItem('token');
            if (!token) {
                // Показываем модалку, если она есть, иначе alert
                if (typeof showAuthRequiredModal === 'function') {
                    showAuthRequiredModal();
                } else {
                    alert("Пожалуйста, авторизуйтесь для записи на курс.");
                }
                return;
            }

            // Получаем название курса
            let courseTitle = null;

            // Пытаемся взять из ближайшей карточки (если кнопка на карточке)
            const card = this.closest('.course-card');
            if (card) {
                courseTitle = card.querySelector('.course-title')?.textContent?.trim();
            }

            // Или fallback — заголовок в превью-модалке
            if (!courseTitle) {
                courseTitle = document.getElementById("previewCourseTitle")?.textContent?.trim();
            }

            if (!courseTitle) {
                alert("Ошибка: не удалось определить название курса.");
                return;
            }

            const courseId = courseIds[courseTitle];
            if (!courseId) {
                alert("Ошибка: Не найден courseId для курса " + courseTitle);
                return;
            }

            // Отправляем запрос на запись
            fetch('http://localhost:5000/api/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ courseId })
            })
            .then(async res => {
                const text = await res.text();
                try {
                    const data = JSON.parse(text);
                    if (res.ok) {
                        alert("Вы успешно записались на курс");
                        // Обновляем только текущую кнопку
                        updateEnrollButton(this, true);
                        if (typeof closeModal === 'function') {
                            closeModal();
                        }
                    } else {
                        console.error(data);
                        alert(data.message || "Ошибка при записи на курс");
                    }
                } catch (err) {
                    console.error("Ответ не JSON:", text);
                    alert("Ошибка при записи на курс");
                }
            })
            .catch(err => {
                console.error("Ошибка запроса:", err);
                alert("Ошибка при отправке запроса");
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const enrollButtons = document.querySelectorAll('.learning-button');

    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const token = localStorage.getItem('token');
            if (!token) {
                // Показываем модалку, если она есть, иначе alert
                if (typeof showAuthRequiredModal === 'function') {
                    showAuthRequiredModal();
                    
                    
                } else {
                    alert("Пожалуйста, авторизуйтесь для записи на курс.");
                }
                
                return;
            }
            else{
                window.location.href = 'my_courses.html';
            }
        });
    });
});

// Функция для загрузки курсов пользователя
async function loadUserCourses() {
    const token = localStorage.getItem('token');
    console.log('Токен:', token); // Отладка
    
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }

    try {
        console.log('Отправка запроса на сервер...'); // Отладка
        const response = await fetch('http://localhost:5000/api/enroll/user-courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Статус ответа:', response.status); // Отладка
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ошибка ответа:', errorText); // Отладка
            throw new Error(`Ошибка при загрузке курсов: ${response.status} ${errorText}`);
        }

        const courses = await response.json();
        console.log('Полученные курсы:', courses); // Для отладки
        
        const coursesGrid = document.querySelector('.my-courses-grid');
        
        if (!coursesGrid) {
            console.error('Элемент .my-courses-grid не найден'); // Отладка
            return;
        }

        // Очищаем сетку курсов
        coursesGrid.innerHTML = '';

        if (courses.length === 0) {
            coursesGrid.innerHTML = '<div class="no-courses">Вы пока не записаны на курсы</div>';
            return;
        }

        // Добавляем карточки для каждого курса
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'my-course-card';
            
            // Получаем данные о курсе из локального хранилища или используем значения по умолчанию
            const courseData = coursesData[course.title] || {
                image: '/src/img/web-course.jpg',
                author: 'Автор не указан',
                price: 'Цена не указана'
            };

            // Определяем статус курса и соответствующие элементы
            let statusClass = '';
            let statusText = '';
            let actionButtons = '';

            // Проверяем, что progress существует и является числом
            const progress = typeof course.progress === 'number' ? course.progress : 0;
            
            if (progress === 100) {
                statusClass = 'completed';
                statusText = 'Завершен';
                actionButtons = `
                    <button class="certificate-button">Получить сертификат</button>
                    <button class="review-button">Оставить отзыв</button>
                `;
            } else if (progress > 0) {
                statusClass = 'active';
                statusText = `Осталось ${course.remainingLessons || 'несколько'} уроков`;
                actionButtons = `
                    <button class="continue-button" onclick="window.location.href='course_page.html?id=${course._id}'">Продолжить обучение</button>
                    <button class="details-button" onclick="openModal('${course.title}')">Подробнее</button>
                `;
            } else {
                statusClass = 'paused';
                statusText = 'Начало обучения';
                actionButtons = `
                    <button class="continue-button" onclick="window.location.href='course_page.html?id=${course._id}'">Начать обучение</button>
                    <button class="details-button" onclick="openModal('${course.title}')">Подробнее</button>
                `;
            }

            courseCard.innerHTML = `
                <div class="my-course-image" style="background-image: url('${courseData.image}')"></div>
                <div class="my-course-content">
                    <h3 class="my-course-title">${course.title}</h3>
                    <p class="my-course-author">${courseData.author}</p>
                    <div class="my-course-info">
                        <span class="my-course-lessons">Урок ${course.currentLesson || 1} из ${course.totalLessons || 12}</span>
                        <span class="my-course-time">${statusText}</span>
                    </div>
                    <div class="my-course-actions">
                        ${actionButtons}
                    </div>
                </div>
            `;

            courseCard.classList.add(statusClass);
            coursesGrid.appendChild(courseCard);
        });
    } catch (error) {
        console.error('Ошибка при загрузке курсов:', error);
        const coursesGrid = document.querySelector('.my-courses-grid');
        if (coursesGrid) {
            coursesGrid.innerHTML = '<div class="error-message">Ошибка при загрузке курсов. Пожалуйста, попробуйте позже.</div>';
        }
    }
}

// Загружаем курсы пользователя при загрузке страницы my_courses.html
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('my_courses.html')) {
        loadUserCourses();
    }
});

// Функция авторизации
async function login(email, password) {
    try {
        console.log('Попытка авторизации...'); // Отладка
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        console.log('Статус ответа авторизации:', response.status); // Отладка

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ошибка авторизации:', errorText); // Отладка
            throw new Error('Ошибка авторизации');
        }

        const data = await response.json();
        console.log('Получен токен:', data.token ? 'Да' : 'Нет'); // Отладка

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        window.location.href = 'my_courses.html';
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        showError('Ошибка при авторизации. Проверьте email и пароль.');
    }
}

// Функция для получения и отображения данных пользователя
async function loadUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            const profileLogin = document.querySelector('.profile-login');
            const profileEmail = document.querySelector('.profile-email');
            const loginInput = document.getElementById('login');
            const emailInput = document.getElementById('email');

            if (profileLogin) profileLogin.textContent = userData.login;
            if (profileEmail) profileEmail.textContent = userData.email;
            if (loginInput) loginInput.value = userData.login;
            if (emailInput) emailInput.value = userData.email;
        } else {
            throw new Error('Ошибка получения данных профиля');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        window.location.href = 'auth.html';
    }
}

// Функция для отображения курсов пользователя на странице профиля
async function loadProfileCourses() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/enroll/user-courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Ошибка при загрузке курсов: ${response.status}`);
        }

        const courses = await response.json();
        const profileCourses = document.querySelector('.profile-courses');
        
        if (!profileCourses) {
            console.error('Элемент .profile-courses не найден');
            return;
        }

        // Очищаем список курсов
        profileCourses.innerHTML = '';

        if (courses.length === 0) {
            profileCourses.innerHTML = '<div class="no-courses">Вы пока не записаны на курсы</div>';
            return;
        }

        // Создаем список курсов
        const coursesList = document.createElement('ul');
        coursesList.className = 'profile-courses-list';

        courses.forEach(course => {
            const courseItem = document.createElement('li');
            courseItem.className = 'profile-course-item';
            
            // Получаем данные о курсе из локального хранилища или используем значения по умолчанию
            const courseData = coursesData[course.title] || {
                image: '/src/img/web-course.jpg',
                author: 'Автор не указан'
            };

            // Определяем статус курса
            const progress = typeof course.progress === 'number' ? course.progress : 0;
            let statusText = '';
            
            if (progress === 100) {
                statusText = 'Завершен';
            } else if (progress > 0) {
                statusText = `Прогресс: ${progress}%`;
            } else {
                statusText = 'Начало обучения';
            }

            courseItem.innerHTML = `
                <div class="profile-course-image" style="background-image: url('${courseData.image}')"></div>
                <div class="profile-course-info">
                    <h3 class="profile-course-title">${course.title}</h3>
                    <p class="profile-course-author">${courseData.author}</p>
                    <p class="profile-course-status">${statusText}</p>
                </div>
                <div class="profile-course-actions">
                    <a href="course_page.html?id=${course._id}" class="profile-course-button">Перейти к курсу</a>
                </div>
            `;

            coursesList.appendChild(courseItem);
        });

        profileCourses.appendChild(coursesList);
    } catch (error) {
        console.error('Ошибка при загрузке курсов:', error);
        const profileCourses = document.querySelector('.profile-courses');
        if (profileCourses) {
            profileCourses.innerHTML = '<div class="error-message">Ошибка при загрузке курсов. Пожалуйста, попробуйте позже.</div>';
        }
    }
}

// Вызываем функцию загрузки профиля и курсов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('profile.html')) {
        loadUserProfile();
        loadProfileCourses();
    }
});