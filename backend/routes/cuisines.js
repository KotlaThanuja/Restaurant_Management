const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load JSON data
const filePath = path.join(__dirname, '../data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Route to get a list of restaurants filtered by cuisines
router.get('/', (req, res) => {
    const { cuisines } = req.query;

    if (!cuisines) {
        return res.status(400).json({ message: 'cuisines query parameter is required' });
    }

    // Convert the comma-separated list of cuisines to an array of trimmed lowercase strings
    const cuisineArray = cuisines.split(',').map(c => c.trim().toLowerCase());

    // Filter restaurants based on the provided cuisines
    const filteredData = data.filter(r => {
        // Convert the restaurant's cuisines to an array of trimmed lowercase strings
        const restaurantCuisines = r.Cuisines.split(',').map(c => c.trim().toLowerCase());
        // Check if any of the provided cuisines match any of the restaurant's cuisines
        return cuisineArray.some(cuisine => restaurantCuisines.includes(cuisine));
    });

    res.json(filteredData);
});

module.exports = router;
