import React, { useState } from 'react';
import '../loginAndSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiFilm } from 'react-icons/bi';

async function createUser(username, password) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const data = await createUser(username, password);
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage('Account created successfully');
        navigate('/');
      }
    } catch (error) {
      setMessage('An error occurred while creating your account');
    }
  };

  return (
    <div className="container d-flex flex-column">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <h1 className="text-center mb-5 text-white">
            <BiFilm className="mx-1 mb-1 stretch" />WatchIt
          </h1>
          <form className="d-flex justify-content-center mx-auto flex-column" onSubmit={handleSubmit}>
            <div className="form-group text-white">
              <label>Username:</label>
              <input type="text"
                     className="form-control"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required />
            </div>
            <div className="form-group text-white">
              <label>Password:</label>
              <input type="password"
                     className="form-control"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required />
            </div>
            <div className="form-group text-white">
              <label>Confirm Password:</label>
              <input type="password"
                     className="form-control"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     required />
            </div>
            <button type="submit" className="text-white border border-white rounded w-25 mx-auto mt-3 p-1">
              Sign Up
            </button>
          </form>
          {message && <p className="mt-5 text-center text-white">{message}</p>}
          <p className="mt-5 text-center text-white">
            Already have an account? <Link to="/" className="text-white"><u>SIGN IN</u></Link>
          </p>
        </div>
      </div>
    </div>
  );
}
