const express = require('express');
const router = express.Router();

// Route for the root URL
router.get('/', (req, res) => {
    res.send('Welcome to the Restaurant API!');
});

module.exports = router;
