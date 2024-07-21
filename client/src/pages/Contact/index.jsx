import React from 'react';
import 'styles/index.scss';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contacts</h1>
      <p>DEV Community would love to hear from you!</p>
      <p>
        Email: <a href="mailto:yo@dev.to">yo@dev.to</a> 😁
      </p>
      <p>
        Twitter:{' '}
        <a href="https://twitter.com/thepracticaldev">@thepracticaldev</a> 👻
      </p>
      <p>
        Report a vulnerability:{' '}
        <a href="https://dev.to/security">dev.to/security</a> 🐛
      </p>
      <p>
        To report a bug, please create{' '}
        <a href="https://github.com/its-hmtu/mern-web-blog">a bug report</a> in
        our open source repository.
      </p>
      <p>
        To request a feature, please{' '}
        <a href="https://github.com/thepracticaldev/forem/discussions/new">
          start a new GitHub Discussion
        </a>{' '}
        in the Forem repo!
      </p>
    </div>
  );
};

export default Contact;
