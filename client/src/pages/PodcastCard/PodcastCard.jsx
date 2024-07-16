import React from 'react';
import PropTypes from 'prop-types';

const PodcastCard = ({ title, image }) => (
  <div className="col-6 col-md-3 mb-4">
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  </div>
);

PodcastCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PodcastCard;
