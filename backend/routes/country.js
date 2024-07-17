const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load JSON data
const filePath = path.join(__dirname, '../data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Route to get a list of restaurants filtered by country code
router.get('/:countryCode', (req, res) => {
    const { countryCode } = req.params;
    const filteredData = data.filter(r => r["Country Code"] === parseInt(countryCode));
    
    res.json(filteredData);
});

module.exports = router;
