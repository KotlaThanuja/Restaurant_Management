const API_URL = '/restaurants';

// Fetch and display the list of restaurants with pagination
async function fetchRestaurants(page = 1, perPage = 10) {
    try {
        const response = await fetch(`${API_URL}?page=${page}&n=${perPage}`);
        const data = await response.json();
        const restaurantList = document.getElementById('restaurant-list');
        const pagination = document.getElementById('pagination');

        if (data.data.length === 0) {
            restaurantList.innerHTML = '<p>No restaurants found.</p>';
            pagination.innerHTML = '';
            return;
        }

        restaurantList.innerHTML = data.data.map(restaurant => `
            <div class="restaurant-item">
                <a href="restaurantDetailPage.html?id=${restaurant['Restaurant ID']}&page=${page}&n=${perPage}">
                    <h2>${restaurant['Restaurant Name']}</h2>
                    <p>${restaurant['City']}</p>
                    <p>${restaurant['Address']}</p>
                </a>
            </div>
        `).join('');

        pagination.innerHTML = `
            <button ${page <= 1 ? 'disabled' : ''} onclick="navigate(${page - 1}, ${perPage})">Previous</button>
            <span>Page ${page} of ${data.total_pages}</span>
            <button ${page >= data.total_pages ? 'disabled' : ''} onclick="navigate(${page + 1}, ${perPage})">Next</button>
        `;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
}

// Fetch and display details of a specific restaurant
async function fetchRestaurantById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const restaurant = await response.json();
        const restaurantDetail = document.getElementById('restaurant-detail');

        restaurantDetail.innerHTML = `
            <h2>${restaurant['Restaurant Name']}</h2>
            <p><strong>City:</strong> ${restaurant['City']}</p>
            <p><strong>Address:</strong> ${restaurant['Address']}</p>
            <p><strong>Cuisines:</strong> ${restaurant['Cuisines']}</p>
            <p><strong>Average Cost for Two:</strong> ${restaurant['Average Cost for two']}</p>
            <p><strong>Rating:</strong> ${restaurant['Aggregate rating']} (${restaurant['Rating text']})</p>
            <p><strong>Votes:</strong> ${restaurant['Votes']}</p>
        `;
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
    }
}

// Handle pagination navigation
function navigate(page, perPage) {
    window.location.href = `restaurantListPage.html?page=${page}&n=${perPage}`;
}