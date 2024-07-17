// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import IdSearch from './components/IdSearch';
import PaginationSearch from './components/PaginationSearch';
import CountrySearch from './components/CountrySearch';
import CostSearch from './components/CostSearch';
import CuisinesSearch from './components/CuisinesSearch';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/id" component={IdSearch} />
        <Route path="/pagination" component={PaginationSearch} />
        <Route path="/country" component={CountrySearch} />
        <Route path="/cost" component={CostSearch} />
        <Route path="/cuisines" component={CuisinesSearch} />
      </Switch>
    </Router>
  );
};

export default App;
