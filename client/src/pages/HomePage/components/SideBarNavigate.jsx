import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const SideBarNavigate = () => {
  return (
    <Nav className="side-bar-navigate">
      <ul>
        <li>
          <Link to="/" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">🏚️</span>
            <span className="flex-grow-1"> Home</span>
          </Link>
        </li>

        <li>
          <Link to="/reading-list" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">📖</span>
            <span className="flex-grow-1 d-flex align-items-center">
              {" "}
              Reading list
              <span
                className="badge ms-2"
                style={{
                  padding: "4px",
                  borderRadius: "4px",
                  backgroundColor: "#d4d4d4",
                  color: "#404040",
                  fontWeight: "400",
                }}
              >
                0
              </span>
            </span>
          </Link>
        </li>

        <li>
          <Link to="/reading-list" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">🏷️</span>
            <span className="flex-grow-1">Categories</span>
          </Link>
        </li>

        <li>
          <Link to="/reading-list" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">❓</span>
            <span className="flex-grow-1">Help</span>
          </Link>
        </li>

        <li>
          <Link to="/reading-list" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">👥</span>
            <span className="flex-grow-1">About</span>
          </Link>
        </li>

        <li>
          <Link to="/reading-list" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">📇</span>
            <span className="flex-grow-1">Contact</span>
          </Link>
        </li>
      </ul>

      

      <ul>
        <h6 className="px-2 mb-2">Other</h6>
        <li>
          <Link Link to="/term-of-use" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">👍</span>
            <span className="flex-grow-1">Term of use</span>
          </Link>
        </li>

        <li>
          <Link
            Link
            to="/code-of-conduct"
            className="d-flex align-items-center"
          >
            <span className="me-2 side-bar-navigate__icon">👀</span>
            <span className="flex-grow-1">Code of conduct</span>
          </Link>
        </li>

        <li>
          <Link Link to="/privacy-policy" className="d-flex align-items-center">
            <span className="me-2 side-bar-navigate__icon">🔐</span>
            <span className="flex-grow-1">Privacy policy</span>
          </Link>
        </li>

        <li>
          <Row className="px-2 mt-3 gap-0">
            <Col>
              <Nav.Link
                href=""
                className="d-flex align-items-center justify-content-center p-2"
              >
                <FontAwesomeIcon icon={faGithub} />
              </Nav.Link>
            </Col>

            <Col>
              <Nav.Link
                href=""
                className="d-flex align-items-center justify-content-center p-2"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </Nav.Link>
            </Col>

            <Col>
              <Nav.Link
                href=""
                className="d-flex align-items-center justify-content-center p-2"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Nav.Link>
            </Col>

            <Col>
              <Nav.Link
                href=""
                className="d-flex align-items-center justify-content-center p-2"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </Nav.Link>
            </Col>
          </Row>
        </li>
      </ul>

      <Footer />
    </Nav>
  );
};

export default SideBarNavigate;
