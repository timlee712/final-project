import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export default function WatchlistForm({ watchlist, setWatchlist }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Add watchlist to the database table
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      // Add watchlist to state
      setWatchlist([...watchlist, data]);
      // Clear form
      setName('');
      // redirect to watchlist page
      navigate('/watchlist');
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };



  return (
    <>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Watchlist Name</Form.Label>
          <Form.Control
            required
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
