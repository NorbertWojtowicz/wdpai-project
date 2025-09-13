document.addEventListener('DOMContentLoaded', async () => {
    const spots_category = document.querySelector('.tabs .tab-button.active').innerHTML;
    console.log(spots_category);
    await displaySpots(spots_category)
});

async function displaySpots(spots_category) {
    const container = document.querySelector('.spots-grid');
    let endpoint = 'peruser'
    if (spots_category === 'Community') {
        endpoint = 'popular';
    }

    const user_spots = await getJSON(`/api/spots/${endpoint}.php`);
    if (user_spots.error === 'Unauthorized') {
       container.innerHTML = '<b>Please sign in to see your spots...</b>';
    } else {
        container.innerHTML = `
          ${user_spots.map(s => `
            <article class="spot-card">
                <div class="spot-image">
                  <img src="images/spots/spot${Math.floor(Math.random() * 9) + 1}.jpg" alt="San Poland fishing spot" referrerpolicy="no-referrer">
                </div>
                <div class="spot-content">
                    <h3 class="spot-title">${s.city} | ${s.country}</h3>
                    <div class="spot-distance">
                        <i class="fa-solid fa fa-map"></i>
                        ${s.name}
                    </div>
                    <div class="spot-tags">
                        <span class="tag tag-fish">Bass, Trout</span>
                    </div>
                </div>
            </article>
          `).join('')}
      `;
    }
}

const category_buttons = document.querySelectorAll('.tabs .tab-button');
for (let i = 0; i < category_buttons.length; i++) {
    category_buttons[i].addEventListener('click', async e => {
        e.preventDefault();
        if (!category_buttons[i].classList.contains('active')) {
            for (let j = 0; j < category_buttons.length; j++) {
                category_buttons[j].classList.toggle('active');
            }
            const active_category = document.querySelector('.tabs .tab-button.active').innerHTML;
            await displaySpots(active_category);
        }
    });
}
