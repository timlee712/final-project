import React from 'react';
import '../loginAndSignup.css';
import { Link, Outlet } from 'react-router-dom';

function Signup() {
  return (
    <div className="container d-flex flex-column">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <h1 className="text-center mb-5 text-white"><i className="fa-solid fa-film mx-1"></i>WatchIt</h1>
          <form className="d-flex justify-content-center mx-auto flex-column">
            <div className="form-group text-white">
              <label>Username:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group text-white">
              <label>Password:</label>
              <input type="password" className="form-control" />
            </div>
            <div className="form-group text-white">
              <label>Confirm Password:</label>
              <input type="password" className="form-control" />
            </div>
            <button type="submit" className="text-white border border-white rounded w-25 mx-auto mt-3">Sign Up</button>
          </form>
          <p className="mt-5 text-center text-white">Already have an account? <Link to="/">Sign In</Link></p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Signup;
