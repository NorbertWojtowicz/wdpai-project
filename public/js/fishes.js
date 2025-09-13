document.addEventListener('DOMContentLoaded', async () => {
    const catches_category = document.querySelector('.tabs .tab-button.active').innerHTML;
    console.log(catches_category);
    await displaySpots(catches_category)
});

async function displaySpots(catches_category) {
    const container = document.querySelector('.catches-grid');
    let endpoint = 'peruser'
    if (catches_category === 'Community') {
        endpoint = 'latest';
    }

    const user_spots = await getJSON(`/api/fish/${endpoint}.php`);
    if (user_spots.error === 'Unauthorized') {
        container.innerHTML = '<b>Please sign in to see your catches...</b>';
    } else {
        container.innerHTML = `
          ${user_spots.map(f => `
            <div class="catch-card">
                <div class="catch-header">
                    <div class="angler-info">
                        <img src="images/user.png" alt="${f.username}" referrerpolicy="no-referrer">
                        <div>
                            <h4>${f.username}</h4>
                            <span class="angler-level">${f.role === 'user' ? 'Angler' : 'Admin'}</span>
                        </div>
                    </div>
                </div>
                <div class="catch-image">
                    <img src="images/fishes/fish${Math.floor(Math.random() * 6) + 1}.jpg" alt="${f.fish_name}" referrerpolicy="no-referrer">
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
    }
}
