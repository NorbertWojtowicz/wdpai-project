document.addEventListener('DOMContentLoaded', async () => {
    const recent_fishes = await getJSON('/api/fish/latest.php');
    const container = document.querySelector('.catches-grid');

    container.innerHTML = `
      ${recent_fishes.slice(0, 3).map(f => `
          <div class="catch-card">
            <div class="catch-header">
                <div class="angler-info">
                    <img src="https://dummyimage.com/32x32/4285f4/ffffff?text=MR" alt="${f.username}" referrerpolicy="no-referrer">
                    <div>
                        <h4>${f.username}</h4>
                        <span class="angler-level">${f.role === 'user' ? 'Angler' : 'Admin'}</span>
                    </div>
                </div>
            </div>
            <div class="catch-image">
                <img src="images/fishes/fish${Math.floor(Math.random() * 8) + 1}.jpg" alt="${f.fish_name}" referrerpolicy="no-referrer">
                <span class="catch-weight">${f.weight_kg} kg</span>
            </div>
            <div class="catch-details">
                <h3>${f.fish_name}</h3>
                <p class="catch-location">${f.spot}</p>
                <p class="catch-date">${new Date(f.caught_at).toDateString()}</p>
            </div>
          </div>
      `).join('')}
  `;
});


document.addEventListener('DOMContentLoaded', async () => {
    const popular_spots = await getJSON('/api/spots/popular.php');
    const container = document.querySelector('.spots-grid');

    container.innerHTML = `
      ${popular_spots.slice(0, 3).map(s => `
         <div class="spot-card">
            <div class="spot-image">
                <img src="images/spots/spot${Math.floor(Math.random() * 9) + 1}.jpg" alt="${s.name}" referrerpolicy="no-referrer">
            </div>
            <div class="spot-content">
                <h3>${s.city} | ${s.country}</h3>
                <p>${s.name}</p>
                <div class="spot-tags">
                    <span class="tag">${s.username} caught ${s.catch_count} fishes</span>
                </div>
            </div>
         </div>
      `).join('')}
  `;
});
