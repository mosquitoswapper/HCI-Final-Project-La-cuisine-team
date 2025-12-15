document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("recommendedList");
    if (!container) return;

    const restaurants = window.RESTAURANTS || [];

    // Only 4 restaurants
    const recommended = restaurants.slice(0, 4);

    container.innerHTML = recommended.map(r => `
    <div class="recommended-card">
    <img src="${r.image}" alt="${r.name}">

    <div class="recommended-content">
        <h3>${r.name}</h3>

        <p class="category">
        ${r.category} ⭐ ${r.rating} (${r.reviews})
        </p>

        <p class="address">${r.address}</p>
    </div>
        <div class="btn">
        <button onclick="window.location.href='../Dea_tasks/dea_foodlist.html'">
                View Menu
        </button>
        <button onclick="window.location.href='../Dea_tasks/reservation_dea.html'">
                Reserve Table
        </button>
    
    </div>
    </div>
`).join("");
});