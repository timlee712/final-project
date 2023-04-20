import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../SearchResults.css';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { FaStar } from 'react-icons/fa';

export default function MovieDescription() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`https://imdb-api.com/en/API/Title/k_qou5dflv/${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  const handleCreateWatchlist = async () => {

  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      {movie && (
        <div className="movie-description text-white">
          <Container>
            <Row>
              <Col xs={12} md={4}>
                <Card className="movie-card text-white my-5">
                  <Card.Img variant="top" src={movie.image} />
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center rating-border p-1">
                      <FaStar color="gold" className="rating" />
                      <span className="rating mx-2">{movie.imDbRating}/10</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={8}>
                <h2 className="header mt-5">{movie.fullTitle}</h2>
                <div className="my-4">
                  <p><strong>Description:</strong> {movie.plot}</p>
                  <p><strong>Director:</strong> {movie.directors}</p>
                  <p><strong>Cast:</strong> {movie.stars}</p>
                </div>
                <Button className="watchlist-button" onClick={handleCreateWatchlist}>Add to Watchlist</Button>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
