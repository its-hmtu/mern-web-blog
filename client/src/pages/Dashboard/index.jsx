import React from 'react';
import 'styles/index.scss';
import PostItem from './PostItem';

const Dashboard = () => {
  const posts = [
    { title: 'Best AI Coding Tools for Developers in 2024', status: 'Draft' },
    { title: 'Understanding React Context API', status: 'Published' },
    { title: 'Guide to Modern JavaScript Features', status: 'Draft' },
  ];

  return (
    <div className="dashboard container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <div className="d-flex justify-content-between mb-4">
        <div className="stat-item text-center">
          <h2>0</h2>
          <p>Total post reactions</p>
        </div>
        <div className="stat-item text-center">
          <h2>0</h2>
          <p>Total post comments</p>
        </div>
        <div className="stat-item text-center">
          <h2>&lt; 500</h2>
          <p>Total post views</p>
        </div>
      </div>
      <div className="posts">
        <h2>Posts</h2>
        <div className="list-group">
          {posts.map((post, index) => (
            <PostItem key={index} title={post.title} status={post.status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
