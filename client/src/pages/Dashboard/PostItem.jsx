import React from 'react';
import PropTypes from 'prop-types';

const PostItem = ({ title, status }) => {
  return (
    <div className="post-item d-flex justify-content-between align-items-center p-2 border-bottom">
      <div>
        <a href="#" className="text-decoration-none text-dark">
          {title}
        </a>
      </div>
      <div>
        <span
          className={`badge ${
            status === 'Draft' ? 'bg-warning' : 'bg-success'
          }`}
        >
          {status}
        </span>
        <button className="btn btn-danger btn-sm ms-2">Delete</button>
        <button className="btn btn-secondary btn-sm ms-2">Edit</button>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default PostItem;
