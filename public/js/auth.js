document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.login-form').addEventListener('submit', async e => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const res = await postJSON('/api/auth/login.php', { username, password });
        if (res.success) {
            alert('Zalogowano!');
            window.location.href = 'index.html';
        } else {
            alert('Błędne dane logowania.');
        }
    });

    document.getElementById('registerForm').addEventListener('submit', async e => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const res = await postJSON('/api/auth/register.php', { username, password });
        if (res.success) {
            alert('Zarejestrowano. Teraz możesz się zalogować.');
        } else {
            alert('Rejestracja nie powiodła się.');
        }
    });
});
