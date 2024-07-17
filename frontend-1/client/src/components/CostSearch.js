// src/components/CostSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const CostSearch = () => {
  const [cost, setCost] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const fetchRestaurantsByCost = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/restaurants/spend/${cost}`);
      setRestaurants(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching restaurants');
      setRestaurants([]);
    }
  };

  return (
    <div>
      <h1>Search Restaurants by Average Cost for Two</h1>
      <input
        type="text"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Enter Average Cost for Two"
      />
      <button onClick={fetchRestaurantsByCost}>Search</button>
      {error && <p>{error}</p>}
      {restaurants.length > 0 && (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.restaurant_id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CostSearch;
