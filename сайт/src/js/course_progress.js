// Получение параметров из URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        course: params.get('course'),
        module: params.get('module'),
        lesson: params.get('lesson')
    };
}

// Подсчет общего количества уроков
function getTotalLessons(courseData) {
    let totalLessons = 0;
    courseData.modules.forEach(module => {
        totalLessons += module.lessons.length;
    });
    return totalLessons;
}

// Вычисление текущего прогресса
function calculateProgress(courseData, currentModule, currentLesson) {
    let completedLessons = 0;
    
    // Подсчет пройденных уроков
    for (let i = 0; i < courseData.modules.length; i++) {
        const module = courseData.modules[i];
        if (i < currentModule - 1) {
            completedLessons += module.lessons.length;
        } else if (i === currentModule - 1) {
            completedLessons += currentLesson;
        }
    }
    
    const totalLessons = getTotalLessons(courseData);
    return Math.round((completedLessons / totalLessons) * 100);
}

// Обновление отображения прогресса
function updateProgressDisplay(progress) {
    const progressText = document.querySelector('.course-progress');
    const progressBar = document.querySelector('.progress-fill');
    
    if (progressText) {
        progressText.textContent = `Прогресс: ${progress}%`;
    }
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// Основная функция инициализации
async function initCourseProgress() {
    try {
        const response = await fetch('../src/data.json');
        const data = await response.json();
        
        const params = getUrlParams();
        const courseId = params.course;
        const currentModule = parseInt(params.module);
        const currentLesson = parseInt(params.lesson);
        
        const courseData = data.courses.find(course => course.id === courseId);
        
        if (courseData) {
            const progress = calculateProgress(courseData, currentModule, currentLesson);
            updateProgressDisplay(progress);
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных курса:', error);
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', initCourseProgress); 