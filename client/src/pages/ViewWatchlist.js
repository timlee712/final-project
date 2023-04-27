import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Watchlist.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getUserId } from '../components/users';
import Loading from '../components/Loading';

export default function ViewWatchlist() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const userId = getUserId();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/watchlists/${userId}/movies`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log('data', data)
        const movieData = await Promise.all(data.map(async (movie) => {
          const apiResponse = await fetch(`https://imdb-api.com/en/API/Title/k_qou5dflv/${movie.movieId}`);
          if (!apiResponse.ok) {
            throw new Error(apiResponse.statusText);
          }
          const apiData = await apiResponse.json();
          console.log('apiData', apiData)
          return {
            id: movie.movieId,
            title: apiData.title,
            image: apiData.image,
          };
        }));
        setWatchlistMovies(movieData);
      } catch (error) {
        console.log(error);
      }
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
            </Col>
          </Row>
          <Row>
            {watchlistMovies.length === 0 && <Loading />}
            {watchlistMovies.length === 0 && <p>No movies added yet</p>}
            {watchlistMovies.map((movie) => (
              <Col xs={6} md={2} key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <Card className="mb-4 movie-card text-white watchlist-card" >
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
