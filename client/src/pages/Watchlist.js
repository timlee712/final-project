import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Watchlist.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { MdAdd } from 'react-icons/md';
import { getUserId } from '../components/users';

export default function Watchlist() {
  const [watchlists, setWatchlists] = useState([]);
  const userId = getUserId();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch(`/api/watchlists/${userId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setWatchlists(data);
    };
    if (userId) {
      fetchWatchlist();
    }
  }, [userId]);

  return (
    <>
      <NavBar />
      <div className="bg text-white">
        <Container>
          <Row>
            <Col className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="header my-4">Watchlist</h2>
              <Link to={`/create-watchlist`}>
                <MdAdd className="add-icon my-4" />
              </Link>
              </div>
              {watchlists.length === 0 && <p>No watchlists created yet</p>}
              {watchlists.map((watchlist) => (
                <Card key={watchlist.watchlistId} className="movie-card my-3">
                  <Card.Body className="watchlist-card">
                    <Card.Title>{watchlist.name}</Card.Title>
                    <Link to={`/watchlist/${watchlist.watchlistId}`}>View watchlist</Link>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );

}
