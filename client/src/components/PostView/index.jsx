import React, { useEffect, useState } from 'react';
import 'styles/index.scss';
import axios from 'axios';

const PostView = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`) // Adjust the URL to your API endpoint
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{post.title}</h1>
          <p className="card-text">{post.content}</p>
          <p className="card-text">
            <small className="text-muted">Author: {post.author}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Published on: {new Date(post.published_at).toLocaleDateString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostView;
