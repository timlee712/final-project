import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import '../Home.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Home() {
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch('https://imdb-api.com/en/API/MostPopularMovies/k_qou5dflv');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setMovies(data.items);
    }
    fetchMovies();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <NavBar />
      <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-container" controls={false} indicators={true} >
        <Carousel.Item>
          {movies.slice(0, 1).map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <img
              className="d-block w-100"
              src={movie.image}
              alt={movie.title}
            />
          </Link>
          ))}
          <Carousel.Caption>
            {movies.slice(0, 1).map((movie) => (
              <Link to={`/movie/${movie.id}`} className="text-white">
              <h3 className="d-flex ">{movie.fullTitle}</h3>
              </Link>
            ))}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {movies.slice(1, 2).map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <img
                className="d-block w-100"
                src={movie.image}
                alt={movie.title}
              />
            </Link>
          ))}
          <Carousel.Caption>
            {movies.slice(1, 2).map((movie) => (
              <Link to={`/movie/${movie.id}`} className="text-white">
                <h3 className="d-flex ">{movie.fullTitle}</h3>
              </Link>
               ))}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {movies.slice(2, 3).map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <img
                className="d-block w-100"
                src={movie.image}
                alt={movie.title}
              />
            </Link>
          ))}
          <Carousel.Caption>
            {movies.slice(2, 3).map((movie) => (
              <Link to={`/movie/${movie.id}`} className="text-white">
                <h3 className="d-flex ">{movie.fullTitle}</h3>
              </Link>
            ))}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {movies.slice(3, 4).map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <img
                className="d-block w-100"
                src={movie.image}
                alt={movie.title}
              />
            </Link>
          ))}
          <Carousel.Caption>
            {movies.slice(3, 4).map((movie) => (
              <Link to={`/movie/${movie.id}`} className="text-white">
                <h3 className="d-flex ">{movie.fullTitle}</h3>
              </Link>
            ))}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {movies.slice(4, 5).map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <img
                className="d-block w-100"
                src={movie.image}
                alt={movie.title}
              />
            </Link>
          ))}
          <Carousel.Caption>
            {movies.slice(4, 5).map((movie) => (
              <Link to={`/movie/${movie.id}`} className="text-white">
                <h3 className="d-flex ">{movie.fullTitle}</h3>
              </Link>
            ))}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="popular-movies">
        <Container>
          <Row>
            <Col>
              <h1 className="my-4 text-white header">Popular Movies</h1>
            </Col>
          </Row>
          <Row>
            {movies.slice(0, 24).map(movie => (
              <Col xs={6} md={2} key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <Card className="mb-4 movie-card">
                    <Card.Img variant="top" src={movie.image} />
                    <Card.Body>
                      <Card.Title>{movie.fullTitle}</Card.Title>
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
