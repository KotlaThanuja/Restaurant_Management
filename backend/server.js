// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Import route files
// const indexRouter = require('./routes/index');
// const restaurantByIdRouter = require('./routes/restaurantById');
// const restaurantsPaginationRouter = require('./routes/restaurantsPagination');
// const countryRouter = require('./routes/country');
// const spendRouter = require('./routes/spend');
// const cuisinesRouter = require('./routes/cuisines');

// // Serve static files from the frontend directory
// app.use(express.static(path.join(__dirname, '../frontend')));

// // Use route files
// app.use('/', indexRouter);
// app.use('/restaurants/id', restaurantByIdRouter);
// app.use('/restaurants', restaurantsPaginationRouter);
// app.use('/restaurants/country', countryRouter);
// app.use('/restaurants/spend', spendRouter);
// app.use('/restaurants/cuisines', cuisinesRouter);

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });



// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const port = 3000;
// const Restaurant = require('./restaurantModel');

// mongoose.connect("mongodb://127.0.0.1:27017/zomatodb").then(() => {
//   console.log("database connected");
// });

// app.get("/restaurants", (req, res) => {
//   Restaurant.find()
//     .then((restaurant) => res.json(restaurant))
//     .catch((err) => res.json(err));
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const Restaurant = require('./restaurantModel');
const cors = require('cors')

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/zomatodb").then(() => {
  console.log("Database connected");
});

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Route to get a list of restaurants with pagination
app.get('/restaurants', (req, res) => {
  const { page = 1, n = 10 } = req.query; // Default to page 1 and 10 items per page if not specified
  const skip = (page - 1) * n;
  const limit = parseInt(n);

  Restaurant.find()
    .skip(skip)
    .limit(limit)
    .then(restaurants => {
      Restaurant.countDocuments().then(total => {
        res.json({
          page: parseInt(page),
          per_page: limit,
          total: total,
          total_pages: Math.ceil(total / limit),
          data: restaurants
        });
      });
    })
    .catch(err => res.json(err));
});

// Route to get a restaurant by Restaurant ID
app.get('/restaurants/id/:id', (req, res) => {
  const { id } = req.params;

  Restaurant.findOne({ "Restaurant ID": parseInt(id) })
    .then(restaurant => {
      if (restaurant) {
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    })
    .catch(err => res.json(err));
});

// Route to get a list of restaurants filtered by country code
app.get('/restaurants/country/:countryCode', (req, res) => {
  const { countryCode } = req.params;

  Restaurant.find({ "Country Code": parseInt(countryCode) })
    .then(restaurants => res.json(restaurants))
    .catch(err => res.json(err));
});

// Route to get a list of restaurants filtered by average cost for two people
app.get('/restaurants/spend/:cost', (req, res) => {
  const { cost } = req.params;

  Restaurant.find({ "Average Cost for two": parseInt(cost) })
    .then(restaurants => res.json(restaurants))
    .catch(err => res.json(err));
});

// Route to get a list of restaurants filtered by cuisines
app.get('/restaurants/cuisines', (req, res) => {
  const { cuisines } = req.query;

  if (!cuisines) {
    return res.status(400).json({ message: 'cuisines query parameter is required' });
  }

  // Convert the comma-separated list of cuisines to an array of trimmed lowercase strings
  const cuisineArray = cuisines.split(',').map(c => c.trim().toLowerCase());

  Restaurant.find()
    .then(restaurants => {
      const filteredData = restaurants.filter(r => {
        // Convert the restaurant's cuisines to an array of trimmed lowercase strings
        const restaurantCuisines = r.Cuisines.split(',').map(c => c.trim().toLowerCase());
        // Check if any of the provided cuisines match any of the restaurant's cuisines
        return cuisineArray.some(cuisine => restaurantCuisines.includes(cuisine));
      });

      res.json(filteredData);
    })
    .catch(err => res.json(err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
