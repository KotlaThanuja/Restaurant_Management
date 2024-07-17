// src/components/Home.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <div>
      <h1>Restaurant Search</h1>
      <button onClick={() => navigateTo('/id')}>Search by ID</button>
      <button onClick={() => navigateTo('/pagination')}>Pagination</button>
      <button onClick={() => navigateTo('/country')}>Search by Country</button>
      <button onClick={() => navigateTo('/cost')}>Search by Average Cost</button>
      <button onClick={() => navigateTo('/cuisines')}>Search by Cuisines</button>
    </div>
  );
};

export default Home;
