import React from 'react';
import PropTypes from 'prop-types';
import PodcastCard from './PodcastCard';

const Section = ({ title, podcasts }) => (
  <div className="mb-5">
    <h2>{title}</h2>
    <div className="row">
      {podcasts.map((podcast, index) => (
        <PodcastCard key={index} title={podcast.title} image={podcast.image} />
      ))}
    </div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Section;
