import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../components/users';
import minionGif from '../minion.gif';

export default function WatchlistForm() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const userId = getUserId();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      userId, // replace with actual user ID
    };
    try {
      const response = await fetch('/api/watchlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create watchlist');
      }
      navigate(`/watchlists`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg text-white">
        <Container>
          <Row>
            <Col>
              <h2 className="header my-4">Create Watchlist</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="loading-container d-flex justify-content-center my-3">
                <img src={minionGif} alt="minions" className="loading-image" />
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="w-75">
              <Form onSubmit={handleSubmit} >
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
                <button type="submit" className="create-watchlist-button p-1 px-2 my-3">
                  Create Watchlist
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
