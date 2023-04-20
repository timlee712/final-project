import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Watchlist.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function SearchResults() {


  return (
    <>
      <NavBar />
      <div className="search-results text-white">
        <Container>
          <Row>
            <Col>
              <h2 className="header my-4">Watchlist</h2>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  );
}
