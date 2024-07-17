const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load JSON data
const filePath = path.join(__dirname, '../data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Route to get a list of restaurants filtered by average cost for two people
router.get('/:cost', (req, res) => {
    const { cost } = req.params;
    const filteredData = data.filter(r => r["Average Cost for two"] === parseInt(cost));

    res.json(filteredData);
});

module.exports = router;
