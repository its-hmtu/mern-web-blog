import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  return (
    <header className="custom-header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">upstairs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#people">People like you</Nav.Link>
              <Nav.Link href="#craft">Craft your website</Nav.Link>
              <Nav.Link href="#products">Inside our products</Nav.Link>
              <Nav.Link href="#along">Along our way</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="text-center my-5">
        <h1>Upstairs</h1>
        <p>
          A place of discovery, learning, and meaningful connections built around creating beautiful
          and successful websites for positive impact. <a href="#story">Read the story of going upstairs.</a>
        </p>
      </Container>
    </header>
  );
};

export default Header;
