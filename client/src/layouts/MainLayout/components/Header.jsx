import React from "react";
import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBell as faBellSolid } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [user, setUser] = React.useState(true);

  return (
    <header className="main-layout__header">
      <Navbar>
        <Navbar.Brand>
          <Link to="/">
            <img className="main-layout__header-logo" src={logo} alt="DEV" />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">{/* {Search bar} */}</Nav>

        {user ? (
          <Nav>
            <Row className="flex-row">
              <Col className="d-flex align-items-center">
                <Link to="/create-post" className="me-2">
                  <Button
                    variant="outline-primary"
                    className="main-layout__header-btn"
                  >
                    Create Post
                  </Button>
                </Link>

                <Link to="/notifications" className="ms-2 me-2">
                  <FontAwesomeIcon icon={faBell} className="main-layout__header-noti"/>
                </Link>

                <Link to='/profile' className="ms-2">
                  <div className="main-layout__header-user p-1">
                    <img src="https://via.placeholder.com/150" alt="User" className="main-layout__header-user-img" />
                  </div>
                </Link>
              </Col>
            </Row>
          </Nav>
        ) : (
          <Nav>
            <Link to="/signin" className="me-2">
              <Button
                variant="outline-primary"
                className="main-layout__header-btn sign-in"
              >
                Sign in
              </Button>
            </Link>

            <Link to="/register" className="ms-2">
              <Button variant="primary" className="main-layout__header-btn">
                Create account
              </Button>
            </Link>
          </Nav>
        )}
      </Navbar>
    </header>
  );
};

export default Header;
