import React from 'react';
import loadingGif from '../loading.gif';
import { Container, Row, Col } from 'react-bootstrap';

const Loading = () => {
  return (
    <Container>
      <Row>

      </Row>
      <Row>
        <Col>
          <div className="loading-container d-flex justify-content-center my-3">
            <img src={loadingGif} alt="Loading..." className="loading-image" />
          </div>
        </Col>
      </Row>
    </Container>

  );
};

export default Loading;
