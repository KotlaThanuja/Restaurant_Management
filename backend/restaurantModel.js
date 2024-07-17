const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Use ObjectId type for MongoDB ObjectId
    restaurant_id: Number,               // Restaurant ID
    name: String,                        // Restaurant Name
    country_code: Number,                // Country Code
    city: String,                        // City
    address: String,                     // Address
    locality: String,                    // Locality
    locality_verbose: String,            // Locality Verbose
    longitude: Number,                   // Longitude
    latitude: Number,                    // Latitude
    cuisines: String,                    // Cuisines
    average_cost_for_two: Number,        // Average Cost for Two
    currency: String,                    // Currency
    has_table_booking: String,           // Has Table Booking
    has_online_delivery: String,         // Has Online Delivery
    is_delivering_now: String,           // Is Delivering Now
    switch_to_order_menu: String,        // Switch to Order Menu
    price_range: Number,                 // Price Range
    aggregate_rating: Number,            // Aggregate Rating
    rating_color: String,                // Rating Color
    rating_text: String,                 // Rating Text
    votes: Number                        // Votes
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
