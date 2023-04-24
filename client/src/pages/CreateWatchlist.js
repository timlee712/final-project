import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export default function WatchlistForm({ watchlist, setWatchlist }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      userId: '<userId>', // replace with actual user ID
    };

    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Watchlist created successfully
        const data = await response.json();
        setWatchlist(data);
        navigate(`/watchlists/${data.watchlistId}`);
      } else {
        throw new Error('Failed to create watchlist');
      }
    } catch (error) {
      console.error(error);
      // Handle error
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
