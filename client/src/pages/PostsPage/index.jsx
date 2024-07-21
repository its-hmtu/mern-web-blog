import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import PostList from '../../components/PostList';

import { ENDPOINTS } from '../../routes/api.path';
import 'styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(ENDPOINTS.getPosts);
        setPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq]);

  return (
    <div className="posts-page container mt-4">
      <ErrorModal error={error} onClose={clearError} />
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default PostsPage;
