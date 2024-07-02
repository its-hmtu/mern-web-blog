import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="side-bar-footer mt-3">
      <p>
        <Link to="/">
          DEV Community
        </Link> A constructive and inclusive social network for software
        developers. With you every step of your journey.
      </p>
      <p>
        Made with love. ❤️ 
        <br />
        DEV Community &copy; 2016 - 2024.
      </p>
    </footer>
  );
};

export default Footer;
