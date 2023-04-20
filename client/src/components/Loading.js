import React from 'react';
import loadingGif from '../loading.gif';

const Loading = () => {
  return (
    <div className="loading-container d-flex justify-content-center my-3">
      <img src={loadingGif} alt="Loading..." className="loading-image" />
    </div>
  );
};

export default Loading;
