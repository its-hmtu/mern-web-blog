import React, { useContext } from 'react';
import { Badge, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBook,
  faPodcast,
  faVideo,
  faTags,
  faLightbulb,
  faShoppingCart,
  faHeart,
  faTrophy,
  faStar,
  faInfoCircle,
  faEnvelope,
  faBookOpen,
  faBalanceScale,
  faThumbsUp,
  faShieldAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faFacebook,
  faInstagram,
  faTwitter,
  faMastodon,
  faTwitch,
} from '@fortawesome/free-brands-svg-icons';
import Footer from './Footer';
import 'styles/index.scss';
import { AuthContext } from 'contexts/AuthContext';

const SideBarNavigate = () => {
  const {user} = useContext(AuthContext);

  return (
    <Nav className="side-bar-navigate flex-column">
      <ul className="list-unstyled">
        <li>
          <Link to="/" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faHome} className="me-2 icon-home" />
            <span>Home</span>
          </Link>
        </li>
        {user && <li>
          <Link to="/reading-list" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBook} className="me-2 icon-reading-list" />
            <span className='d-flex '>Reading List 
              <Badge bg="primary" className="ms-2 d-flex justify-content-center align-items-center" style={{
                maxHeight: '20px',
              }}>{user?.reading_list.length}</Badge>
            </span>
          </Link>
        </li>}
        <li>
          <Link to="/tags" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faTags} className="me-2 icon-tags" />
            <span>Categories</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="me-2 icon-about" />
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="me-2 icon-contact" />
            <span>Contact</span>
          </Link>
        </li>
        <li>
          <Link to="/posts" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBookOpen} className="me-2 icon-posts" />
            <span>Posts</span>
          </Link>
        </li>
      </ul>

      <hr />
      <h6 className="px-1 my-2">Other</h6>
      <ul className="list-unstyled">
        <li>
          <Link to="/code-of-conduct" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faThumbsUp} className="me-2 icon-conduct" />
            <span>Code of Conduct</span>
          </Link>
        </li>
        <li>
          <Link to="/privacy-policy" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faShieldAlt} className="me-2 icon-privacy" />
            <span>Privacy Policy</span>
          </Link>
        </li>
        <li>
          <Link to="/terms-of-use" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faEye} className="me-2 icon-terms" />
            <span>Terms of Use</span>
          </Link>
        </li>
      </ul>

      <div className="d-flex justify-content-center mt-4">
        <Nav.Link
          href="https://github.com/its-hmtu/mern-web-blog"
          className="p-2"
        >
          <FontAwesomeIcon icon={faGithub} className="icon-github" />
        </Nav.Link>
        <Nav.Link
          href="https://www.facebook.com/thepracticaldev"
          className="p-2"
        >
          <FontAwesomeIcon icon={faFacebook} className="icon-facebook" />
        </Nav.Link>
        <Nav.Link
          href="https://www.instagram.com/thepracticaldev/"
          className="p-2"
        >
          <FontAwesomeIcon icon={faInstagram} className="icon-instagram" />
        </Nav.Link>
        <Nav.Link href="https://x.com/thepracticaldev" className="p-2">
          <FontAwesomeIcon icon={faTwitter} className="icon-twitter" />
        </Nav.Link>
        <Nav.Link href="https://fosstodon.org/@thepracticaldev" className="p-2">
          <FontAwesomeIcon icon={faMastodon} className="icon-mastodon" />
        </Nav.Link>
        <Nav.Link href="https://www.twitch.tv/thepracticaldev" className="p-2">
          <FontAwesomeIcon icon={faTwitch} className="icon-twitch" />
        </Nav.Link>
      </div>

      <Footer />
    </Nav>
  );
};

export default SideBarNavigate;
