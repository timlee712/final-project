import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDescription from './pages/MovieDescription';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="search/:query" element={<SearchResults />} />
          <Route path="movie/:id" element={<MovieDescription />} />

      </Routes>
    </div>
  );
}

export default App;
