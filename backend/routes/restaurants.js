const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load JSON data
const filePath = path.join(__dirname, '../data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Route to get a restaurant by Restaurant ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const restaurant = data.find(r => r["Restaurant ID"] === parseInt(id));

    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
});

// Route to get a list of restaurants with pagination
router.get('/', (req, res) => {
    const { page = 1, n = 10 } = req.query; // Default to page 1 and 10 items per page if not specified
    const startIndex = (page - 1) * n;
    const endIndex = startIndex + parseInt(n);

    const paginatedRestaurants = data.slice(startIndex, endIndex);

    res.json({
        page: parseInt(page),
        per_page: parseInt(n),
        total: data.length,
        total_pages: Math.ceil(data.length / n),
        data: paginatedRestaurants
    });
});

module.exports = router;
