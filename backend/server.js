const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import route files
const indexRouter = require('./routes/index');
const restaurantsRouter = require('./routes/restaurants');
const countryRouter = require('./routes/country');
const spendRouter = require('./routes/spend');
const cuisinesRouter = require('./routes/cuisines');

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Use route files
app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/restaurants/country', countryRouter);
app.use('/restaurants/spend', spendRouter);
app.use('/restaurants/cuisines', cuisinesRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
