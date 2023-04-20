import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../SearchResults.css';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';

export default function SearchResults() {
  const { query } = useParams();
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const response = await fetch(`https://imdb-api.com/en/API/SearchMovie/k_qou5dflv/${query}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setMovieResults(data.results);
      setIsLoading(false);
    };
    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="search-results text-white">
        <Container>
          <Row>
            <Col>
              <h2 className="header my-4">Search Results</h2>
            </Col>
          </Row>
          {isLoading && <Loading />}
          <Row>
            {movieResults.map((movie) => (
              <Col xs={6} md={2} key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <Card className="mb-4 movie-card text-white">
                    <Card.Img variant="top" src={movie.image} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
