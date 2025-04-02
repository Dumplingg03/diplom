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