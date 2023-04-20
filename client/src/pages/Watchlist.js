import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Watchlist.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { MdAdd } from 'react-icons/md';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch('/api/watchlist');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setWatchlist(data);
    };
    fetchWatchlist();
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg text-white">
        <Container>
          <Row>
            <Col>
              <h2 className="header my-4">Watchlist</h2>
              {/* {watchlist.length === 0 && <p>No movies in watchlist</p>}
              {watchlist.map(movie => (
                <Card key={movie.id} className="movie-card my-3">
                  <Link to={`/movies/${movie.id}`}>
                    <Card.Img variant="top" src={movie.image} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>{movie.plot}</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              ))} */}
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to={`/create-watchlist`}>
              <MdAdd className="add-icon my-4" />
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
