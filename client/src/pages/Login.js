import React, { useState } from 'react';
import '../loginAndSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiFilm } from 'react-icons/bi';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { setUserId } from '../components/users';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage('Incorrect username or password');
      } else {
        // save the userId to local storage
        setUserId(data.userId)
        console.log(data);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while logging in');
    }
  };


  return (
    <Container fluid className="d-flex flex-column user skyblue">
      <Row>
        <Col lg={6} className="mx-auto">
          <h1 className="text-center mb-5 text-white">
            <BiFilm className="mx-1 mb-1 stretch" />WatchIt
          </h1>
          <Form className="d-flex justify-content-center mx-auto flex-column" onSubmit={handleSubmit}>
            <Form.Group className="text-white">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text"
                className="mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </Form.Group>
            <Form.Group className="text-white">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password"
                className="mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </Form.Group>
            <button type="submit" className="text-white border border-white rounded w-25 mx-auto mt-3 p-1 skyblue">
              Sign In
            </button>
          </Form>
          {message && <p className="mt-5 text-center text-white">{message}</p>}
          <p className="mt-5 text-center text-white">
            Don't have an account? <Link to="/signup" className="text-white"><u>SIGN UP</u></Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
