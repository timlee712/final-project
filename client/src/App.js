import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
