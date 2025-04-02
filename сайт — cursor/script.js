document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const courseCards = document.querySelectorAll('.course-card');
    const prevButton = document.querySelector('.slider-button:first-child');
    const nextButton = document.querySelector('.slider-button:last-child');
    let currentTab = 0;
    const cardsPerTab = 3;

    function updateActiveTab(index) {
        // Скрываем все карточки
        courseCards.forEach(card => {
            card.classList.add('hidden');
        });

        // Показываем карточки для текущей вкладки
        const startIndex = index * cardsPerTab;
        const endIndex = startIndex + cardsPerTab;
        for (let i = startIndex; i < endIndex; i++) {
            if (courseCards[i]) {
                courseCards[i].classList.remove('hidden');
            }
        }

        // Обновляем активную вкладку
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[index].classList.add('active');
    }

    function moveCarousel(direction) {
        if (direction === 'next' && currentTab < tabs.length - 1) {
            currentTab++;
        } else if (direction === 'prev' && currentTab > 0) {
            currentTab--;
        }
        updateActiveTab(currentTab);
    }

    // Инициализация карусели
    updateActiveTab(0);

    // Обработчики событий
    prevButton.addEventListener('click', () => moveCarousel('prev'));
    nextButton.addEventListener('click', () => moveCarousel('next'));

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            currentTab = index;
            updateActiveTab(currentTab);
        });
    });
});