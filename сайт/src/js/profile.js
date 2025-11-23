document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.querySelector('.profile-settings');
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    profileForm.parentNode.insertBefore(messageContainer, profileForm);

    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Пользователь не авторизован');
            }

            const response = await fetch('http://localhost:5000/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    password: password || undefined
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Произошла ошибка');
            }

            // После успешного сохранения обновляем страницу
            window.location.reload();
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });

    function showMessage(message, type) {
        messageContainer.textContent = message;
        messageContainer.className = `message-container ${type}`;
        
        setTimeout(() => {
            messageContainer.textContent = '';
            messageContainer.className = 'message-container';
        }, 3000);
    }
}); 