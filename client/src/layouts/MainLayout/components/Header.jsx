import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "images/logo.png";

const Header = () => {
  return (
    <header className="main-layout__header">
      <Navbar>
        <Navbar.Brand>
          <Link to="/">
            <img className="main-layout__header-logo" src={logo} alt="DEV" />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">{/* {Search bar} */}</Nav>

        <Nav>
          <Link to="/signin" className="me-2">
            <Button variant="outline-primary" className="main-layout__header-btn sign-in">Sign in</Button>
          </Link>

          <Link to="/register" className="ms-2">
            <Button variant="primary" className="main-layout__header-btn">Create account</Button>
          </Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
