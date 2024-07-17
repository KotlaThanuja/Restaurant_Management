// src/components/CuisinesSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const CuisinesSearch = () => {
  const [cuisines, setCuisines] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const fetchRestaurantsByCuisines = async () => {
    try {
      const response = await axios.get('http://localhost:3000/restaurants/cuisines', {
        params: { cuisines }
      });
      setRestaurants(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching restaurants');
      setRestaurants([]);
    }
  };

  return (
    <div>
      <h1>Search Restaurants by Cuisines</h1>
      <input
        type="text"
        value={cuisines}
        onChange={(e) => setCuisines(e.target.value)}
        placeholder="Enter Cuisines (comma-separated)"
      />
      <button onClick={fetchRestaurantsByCuisines}>Search</button>
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

export default CuisinesSearch;
