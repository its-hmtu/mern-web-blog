import React from 'react';
import 'styles/index.scss';

const PostItem = ({ post }) => {
  return (
    <div className="post-item card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
      </div>
      <div className="card-footer text-muted">
        {post.author} - {new Date(post.date).toLocaleDateString()}
      </div>
    </div>
  );
};

export default PostItem;
