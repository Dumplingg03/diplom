// Функция для проверки авторизации и изменения кнопки
function updateAuthButton() {
    const authButton = document.querySelector('.auth-button');
    const logoutButton = document.querySelector('.logout-button');
    if (authButton) {
        const token = localStorage.getItem('token');
        if (token) {
            authButton.textContent = 'Профиль';
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

// Получаем элементы модального окна
const modal = document.getElementById('coursePreviewModal');
const closeButton = document.querySelector('.close-modal');
const courseCards = document.querySelectorAll('.course-card');

// Функция для открытия модального окна
function openModal(courseTitle) {
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
        
        modal.classList.add('active');
    }
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('active');
}

// Добавляем обработчики событий
courseCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const courseTitle = card.querySelector('.course-title').textContent;
        openModal(courseTitle);
    });
});

closeButton.addEventListener('click', closeModal);
// Закрытие модального окна при клике вне его области
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие модального окна при нажатии клавиши Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
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
                        const enrollButtons = document.querySelectorAll('.enroll-button');
                        enrollButtons.forEach(button => {
                            button.textContent = 'Вы уже записаны';
                            button.classList.add('enrolled');
                            button.disabled = true;
                            button.style.backgroundColor = '#cccccc';
                            button.style.cursor = 'not-allowed'
                        });
                        if (typeof closeModal === 'function') {
                            closeModal();
                        }
                    } else {
                        /* Изменнеие кнопки после записи на курс
                        const enrollButtons = document.querySelectorAll('.enroll-button');
                        enrollButtons.forEach(button => {
                            button.textContent = 'Вы уже записаны';
                            button.classList.add('enrolled');
                            button.disabled = true;
                            button.style.backgroundColor = '#cccccc';
                            button.style.cursor = 'not-allowed'
                        });
                        */
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
