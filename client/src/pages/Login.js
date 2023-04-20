import React, { useState } from 'react';
import '../loginAndSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiFilm } from 'react-icons/bi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username === 'demo' && password === 'demo') {
        navigate('/');
      } else {
        setMessage('Incorrect username or password');
      }
    } catch (error) {
      setMessage('An error occurred while logging in');
    }
  };

  return (
    <div className="container d-flex flex-column user skyblue">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <h1 className="text-center mb-5 text-white">
            <BiFilm className="mx-1 mb-1 stretch" />WatchIt
          </h1>
          <form className="d-flex justify-content-center mx-auto flex-column" onSubmit={handleSubmit}>
            <div className="form-group text-white">
              <label>Username:</label>
              <input placeholder="demo" required type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group text-white">
              <label>Password:</label>
              <input placeholder="demo" required type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="text-white border border-white rounded w-25 mx-auto mt-3 p-1 skyblue">Sign In</button>
            {message && <p className="text-center text-danger mt-3">{message}</p>}
          </form>
          <p className="mt-5 text-center text-white">Don't have an account? <Link to="/signup" className="text-white link"><u>SIGN UP</u></Link></p>
        </div>
      </div>
    </div>
  );
}
