import React, { useState, useEffect } from 'react';
import { BiFilm } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoPersonCircle } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { Navbar, Nav, Form, FormControl, Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import '../Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the search query, e.g. navigate to a search results page
    console.log(`Submitting search query: ${searchQuery}`);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar expand="lg" className="pb-1 skyblue">
        <Navbar.Toggle aria-controls="navbarNav" className="p-1">
          <GiHamburgerMenu className="hamburger-menu text-white" />
        </Navbar.Toggle>
        <Navbar.Brand className="text-white">
          <BiFilm className="film-icon mx-1 mt-lg-2" />
          <span className="title">WatchIt</span>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/login" className="nav-link text-white d-none d-lg-block">Watchlist</Link>
        </Nav>
        <Nav className="ml-auto d-flex flex-row">
          <Form inline className="mr-lg-2 d-flex d-lg-none" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-1 rounded-pill mt-1 search-bar"
              value={searchQuery}
              onChange={handleChange}
              onKeyPress={(event) => event.key === 'Enter' && handleSubmit(event)}
            />
          </Form>
          <IoPersonCircle className="person-icon text-white ml-1 d-lg-none" />
        </Nav>
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto d-lg-none">
            <Link to="/login" className="nav-link text-white">Watchlist</Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="d-none d-lg-flex">
          <Form inline className="mr-lg-2 d-none d-lg-flex" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2 rounded-pill mt-1 ml-auto search-bar h-75"
              value={searchQuery}
              onChange={handleChange}
              onKeyPress={(event) => event.key === 'Enter' && handleSubmit(event)}
            />
          </Form>
          <IoPersonCircle className="person-icon text-white ml-1 mb-1" />
        </Nav>
      </Navbar>
      <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-container" controls={false} indicators={false} >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/720x300"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/720x300"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/720x300"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/720x300"
            alt="Fourth slide"
          />
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
                <Card className="mb-4 movie-card">
                  <Card.Img variant="top" src={movie.image} />
                  <Card.Body>
                    <Card.Title>{movie.fullTitle}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
