// src/components/IdSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const IdSearch = () => {
  const [id, setId] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  const fetchRestaurantById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/restaurants/id/${id}`);
      setRestaurant(response.data);
      setError(null);
    } catch (err) {
      setError('Restaurant not found');
      setRestaurant(null);
    }
  };

  return (
    <div>
      <h1>Search Restaurant by ID</h1>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter Restaurant ID" />
      <button onClick={fetchRestaurantById}>Search</button>
      {error && <p>{error}</p>}
      {restaurant && (
        <div>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.address}</p>
          <p>{restaurant.cuisines}</p>
          {/* Display other restaurant details as needed */}
        </div>
      )}
    </div>
  );
};

export default IdSearch;
