import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/create-post">Create a New Post</Link>
    </div>
  );
};

export default HomePage;
