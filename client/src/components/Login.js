import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
