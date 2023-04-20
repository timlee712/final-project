import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar';

export default function WatchlistForm({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Watchlist Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Watchlist
        </Button>
      </Form>
    </>
  );
}
