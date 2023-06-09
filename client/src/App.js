import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDescription from './pages/MovieDescription';
import Watchlist from './pages/Watchlist';
import CreateWatchlist from './pages/CreateWatchlist';
import ViewWatchlist from './pages/ViewWatchlist';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="search/:query" element={<SearchResults />} />
          <Route path="movie/:id" element={<MovieDescription />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="create-watchlist" element={<CreateWatchlist />} />
          <Route path="watchlist/:id" element={<ViewWatchlist />} />

      </Routes>
    </div>
  );
}

export default App;
