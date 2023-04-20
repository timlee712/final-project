import React from 'react';
import loadingGif from '../loading.gif';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="loading-container d-flex justify-content-center my-3">
      <img src={loadingGif} alt="Loading..." className="loading-image" />
    </div>
    // <Spinner animation="border" role="status" className="d-flex justify-content-center my-3" size="2x" />
  );
};

export default Loading;
