(function () {
    const el = document.getElementById('authBar');
    if (!el) return;

    const CREDENTIALS = 'same-origin'; // Jeśli API jest na innej domenie, zmień na 'include'

    function esc(s) {
        return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]));
    }


    async function renderAuthBar() {
        try {
            const data = await getJSON('/api/auth/me.php');

            if (data.logged_in) {
                el.innerHTML = `
          <div class="auth-bar">
            <span class="hello">Witaj, ${esc(data.user.username)}!</span>
            <button id="logoutBtn" class="sign-out-btn">Wyloguj</button>
          </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', async () => {
            try {
                await fetch('/api/auth/logout.php', { method: 'POST', credentials: CREDENTIALS });
            } catch (_) {}
            location.reload();
        });
            } else {
                el.innerHTML = `
          <div class="auth-bar">
            <a href="login.html" class="sign-out-btn">Zaloguj</a>
          </div>
        `;
            }
        } catch (e) {
            el.innerHTML = `
        <div class="auth-bar">
          <a href="login.html" class="sign-out-btn">Zaloguj</a>
        </div>
      `;
        }
    }

    document.addEventListener('DOMContentLoaded', renderAuthBar);
})();
