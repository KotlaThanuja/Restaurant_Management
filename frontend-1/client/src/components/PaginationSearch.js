// src/components/PaginationSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const PaginationSearch = () => {
  const [page, setPage] = useState('');
  const [n, setN] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/restaurants`, {
        params: { page, n }
      });
      setRestaurants(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error fetching restaurants');
      setRestaurants([]);
    }
  };

  return (
    <div>
      <h1>Pagination</h1>
      <input type="text" value={page} onChange={(e) => setPage(e.target.value)} placeholder="Page" />
      <input type="text" value={n} onChange={(e) => setN(e.target.value)} placeholder="Number of items per page" />
      <button onClick={fetchRestaurants}>Search</button>
      {error && <p>{error}</p>}
      {restaurants.length > 0 && (
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.restaurant_id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaginationSearch;
