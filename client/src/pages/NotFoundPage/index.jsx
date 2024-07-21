import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container text-center">
      <div className="not-found-content not-found-content-text">
        <img src="404.jpeg" alt="404" className="not-found-image" />
        <h1 className="mt-4">This page does not exist</h1>
        <Link to="/" className="btn btn-primary mt-3">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
