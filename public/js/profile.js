document.addEventListener('DOMContentLoaded', async () => {
    const stats = await getJSON('/api/user/profile.php');
    console.log(stats);
    if (stats.error === 'Unauthorized') {
        window.location.href = 'login.html';
    } else {
        const containerStats = document.querySelector('.stats-section');

        containerStats.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fa-solid fa fa-fish"></i>
            </div>
            <div class="stat-content">
                <p class="stat-label">Total Catches</p>
                <p class="stat-value">${stats.total_fish}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon trophy">
                <i class="fa-solid fa fa-trophy"></i>
            </div>
            <div class="stat-content">
                <p class="stat-label">Biggest Catch</p>
                <p class="stat-value">${stats.max_weight || 0} kg</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon location">
                <i class="fa-solid fa fa-map"></i>
            </div>
            <div class="stat-content">
                <p class="stat-label">My spots</p>
                <p class="stat-value">${stats.total_spots}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon heart">
                <i class="fa-solid fa fa-heart"></i>
            </div>
            <div class="stat-content">
                <p class="stat-label">Favourite Spot</p>
                <p class="stat-value">${stats.favorite_spot || 'Obecnie brak'}</p>
            </div>
        </div>
    `;

    const recent_fishes = await getJSON('/api/fish/peruser.php');
    const containerCatches = document.querySelector('.catches-grid');

    containerCatches.innerHTML = `
      ${recent_fishes.slice(0, 6).map(f => `
          <article class="catch-card">
                <div class="catch-image">
                    <img src="images/fishes/fish${Math.floor(Math.random() * 6) + 1}.jpg" alt="${f.fish_name}" referrerpolicy="no-referrer">
                    <span class="catch-weight">${f.weight_kg} kg</span>
                </div>
                <div class="catch-info">
                    <h3 class="catch-name">${f.fish_name}</h3>
                    <div class="catch-details">
                        <div class="catch-location">
                            <i class="fa-solid fa fa-map"></i>
                            <span>${f.spot}</span>
                        </div>
                        <div class="catch-date">
                            <i class="fa-solid fa fa-calendar"></i>
                            <span>${new Date(f.caught_at).toDateString()}</span>
                        </div>
                    </div>
                </div>
            </article>
    `).join('')}
  `;
    const containerDetails = document.querySelector('.profile-details');
    containerDetails.innerHTML = `
        <h1 class="profile-name">${stats.current_user.username}</h1>
        <p class="profile-title">${stats.current_user.role === 'user' ? 'Angler' : 'Admin'}</p>
        </div>
    `;
    }
});
