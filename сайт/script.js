document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Функция для переключения вкладок
    function switchTab(event) {
        event.preventDefault();
        
        // Удаляем активный класс у всех вкладок
        tabLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Добавляем активный класс выбранной вкладке
        this.classList.add('active');
        
        // Находим соответствующий контент и показываем его
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }
    
    // Назначаем обработчики событий для каждой вкладки
    tabLinks.forEach(link => {
        link.addEventListener('click', switchTab);
    });
    
    // Инициализация: показываем первую вкладку по умолчанию
    const firstTab = document.querySelector('.tab-link.active');
    if (firstTab) {
        const tabId = firstTab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }
});