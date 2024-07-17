// src/components/CountrySearch.js
import React, { useState } from 'react';
import axios from 'axios';

const CountrySearch = () => {
  const [countryCode, setCountryCode] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const fetchRestaurantsByCountry = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/restaurants/country/${countryCode}`);
      setRestaurants(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching restaurants');
      setRestaurants([]);
    }
  };

  return (
    <div>
      <h1>Search Restaurants by Country Code</h1>
      <input
        type="text"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        placeholder="Enter Country Code"
      />
      <button onClick={fetchRestaurantsByCountry}>Search</button>
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

export default CountrySearch;
