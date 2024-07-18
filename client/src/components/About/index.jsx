import React from 'react';
import 'styles/index.scss';

const AboutPage = () => {
  return (
    <div className="about-page container mt-5">
      <h1 className="mb-4">About DEV</h1>
      <p>
        DEV is a community of software developers getting together to help one
        another out. The software industry relies on collaboration and networked
        learning. We provide a place for that to happen.
      </p>
      <p>
        DEV is built on{' '}
        <a href="https://forem.dev" target="_blank" rel="noopener noreferrer">
          Forem
        </a>
        : open source software designed to empower communities. Because our
        application is{' '}
        <a
          href="https://github.com/forem/forem"
          target="_blank"
          rel="noopener noreferrer"
        >
          open source
        </a>
        , you can inspect every little detail of the code, or chip in yourself!
        Forem is available for anyone interested in creating similar communities
        in any niche or passion. Visit our meta Forem,{' '}
        <a href="https://forem.dev" target="_blank" rel="noopener noreferrer">
          forem.dev
        </a>{' '}
        for more information.
      </p>
      <p>
        We believe in transparency and adding value to the ecosystem. We hope
        you enjoy poking around and participating!
      </p>
      <h2 className="mt-5 mb-4">Leadership</h2>
      <div className="leadership">
        <img
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--c4zTsjvv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://res.cloudinary.com/practicaldev/image/fetch/s--S2Ud7coR--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/0r746whbdtl8uvs98uah.JPG"
          alt="Leadership"
          className="img-fluid mb-4"
        />
        <p>
          DEV is led by Forem's co-founders{' '}
          <a
            href="https://twitter.com/bdougieYO"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ben Halpern
          </a>
          ,{' '}
          <a
            href="https://twitter.com/jessleenyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jess Lee
          </a>
          , and{' '}
          <a
            href="https://twitter.com/peterfrank"
            target="_blank"
            rel="noopener noreferrer"
          >
            Peter Frank
          </a>{' '}
          ("PB&J").
        </p>
        <p>
          Happy coding{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
