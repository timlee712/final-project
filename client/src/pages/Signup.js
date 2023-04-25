import React, { useState } from 'react';
import '../loginAndSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiFilm } from 'react-icons/bi';
import { Container, Row, Col, Form } from 'react-bootstrap';

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
        navigate('/login');
      }
    } catch (error) {
      setMessage('An error occurred while creating your account');
    }
  };

  return (
    <Container fluid className="d-flex flex-column user skyblue">
      <Row>
        <Col lg={6} className="mx-auto">
          <h1 className="text-center mb-5 text-white title">
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
                className="mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </Form.Group>
            <Form.Group className="text-white">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password"
                className="mb-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required />
            </Form.Group>
            <button type="submit" className="text-white border border-white rounded w-25 mx-auto mt-3 p-1 skyblue">
              Sign Up
            </button>
          </Form>
          {message && <p className="mt-5 text-center text-white">{message}</p>}
          <p className="mt-5 text-center text-white">
            Already have an account? <Link to="/login" className="text-white"><u>SIGN IN</u></Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
