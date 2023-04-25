import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Watchlist.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getUserId } from '../components/users';

export default function ViewWatchlist() {
  const [movies, setMovies] = useState([]);
  const userId = getUserId();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`/api/watchlists/${userId}/movies`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setMovies(data);
    };
    if (userId) {
      fetchMovies();
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
                <h2 className="header my-4">Movies</h2>
              </div>
              {movies.length === 0 && <p>No movies add yet</p>}
              {movies.map((movie) => (
                <Col xs={6} md={2} key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <Card className="mb-4 movie-card text-white" >
                      <Card.Img variant="top" src={movie.image} />
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );

}
