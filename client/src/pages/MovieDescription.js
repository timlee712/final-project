import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import '../SearchResults.css';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUserId } from '../components/users';


export default function MovieDescription() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [watchlists, setWatchlists] = useState(null);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState(null);
  const userId = getUserId();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchWatchlists = async () => {
      const response = await fetch(`/api/watchlists/${userId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setWatchlists(data);
    };
    if (userId) {
      fetchWatchlists();
    }
  }, [userId]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelect = (event, id) => {
    setSelectedWatchlistId(id);

  };

  const handleAddToWatchlist = async () => {
    if (selectedWatchlistId !== null) {
      const response = await fetch(`/api/watchlists/${selectedWatchlistId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      handleCloseModal();
      navigate('/watchlist');
    }
  };

  if (!movie) {
    return <Loading />;
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
                  <p><strong>Runtime:</strong> {movie.runtimeStr}</p>
                </div>
                <button className="watchlist-button p-1 px-2" onClick={handleShowModal}>
                  Add to Watchlist
                </button>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header>
                    <Modal.Title>Add to Watchlist</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {watchlists.map((list) => (
                      <div key={list.watchlistId}>
                        <Form.Check
                          type="checkbox"
                          id={list.watchlistId}
                          label={list.name}
                          onChange={(event) => handleSelect(event.target, list.watchlistId)}

                          required
                        />
                      </div>
                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleAddToWatchlist}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>

  );
}
