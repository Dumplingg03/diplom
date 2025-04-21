document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущий путь к уроку
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const courseId = pathParts[pathParts.indexOf('courses') + 1];
    const lessonId = pathParts[pathParts.indexOf('lessons') + 1].replace('.html', '');

    // Загружаем информацию о курсе
    fetch(`/courses/${courseId}/course.json`)
        .then(response => response.json())
        .then(course => {
            const lessons = course.lessons;
            const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
            
            // Настраиваем кнопки навигации
            const prevButton = document.querySelector('.nav-button.prev');
            const nextButton = document.querySelector('.nav-button.next');
            
            if (currentLessonIndex > 0) {
                const prevLesson = lessons[currentLessonIndex - 1];
                prevButton.disabled = false;
                prevButton.addEventListener('click', () => {
                    window.location.href = `/courses/${courseId}/lessons/${prevLesson.id}.html`;
                });
            }
            
            if (currentLessonIndex < lessons.length - 1) {
                const nextLesson = lessons[currentLessonIndex + 1];
                nextButton.addEventListener('click', () => {
                    window.location.href = `/courses/${courseId}/lessons/${nextLesson.id}.html`;
                });
            } else {
                nextButton.disabled = true;
            }
        })
        .catch(error => console.error('Ошибка при загрузке информации о курсе:', error));

    // Обработка завершения урока
    const completeButton = document.querySelector('.complete-lesson');
    if (completeButton) {
        completeButton.addEventListener('click', function() {
            // Здесь можно добавить логику сохранения прогресса
            alert('Урок завершен!');
            // Переход к следующему уроку
            const nextButton = document.querySelector('.nav-button.next');
            if (nextButton && !nextButton.disabled) {
                nextButton.click();
            }
        });
    }
}); 