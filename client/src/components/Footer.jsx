import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
 // Tạo file CSS để tùy chỉnh thêm

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>A little bit more about Pixelgrade</h5>
            <p>Our mission is to support people who want to make an impact in their communities.</p>
          </Col>
          <Col md={3}>
            <h5>An inside look:</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-light">About</a></li>
              <li><a href="#blog" className="text-light">Blog</a></li>
              <li><a href="#reports" className="text-light">Transparency Reports</a></li>
            </ul>
            <h5>Follow us on:</h5>
            <ul className="list-unstyled">
              <li><a href="#github" className="text-light">GitHub</a></li>
              <li><a href="#twitter" className="text-light">Twitter</a></li>
              <li><a href="#facebook" className="text-light">Facebook</a></li>
              <li><a href="#rss" className="text-light">RSS Feed</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Fine print:</h5>
            <ul className="list-unstyled">
              <li><a href="#policies" className="text-light">Policies and Terms</a></li>
            </ul>
            <h5>Overview:</h5>
            <ul className="list-unstyled">
              <li><a href="#showcase" className="text-light">Showcase</a></li>
              <li><a href="#themes" className="text-light">Themes</a></li>
              <li><a href="#upstairs" className="text-light">Upstairs</a></li>
              <li><a href="#affiliates" className="text-light">Affiliates</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>?Need help</h5>
            <ul className="list-unstyled">
              <li><a href="#support" className="text-light">Support</a></li>
              <li><a href="#documentation" className="text-light">Documentation</a></li>
              <li><a href="#contact" className="text-light">Contact</a></li>
              <li><a href="#services" className="text-light">Services</a></li>
            </ul>
            <h5>Resources:</h5>
            <ul className="list-unstyled">
              <li><a href="#help-center" className="text-light">Help Center</a></li>
              <li><a href="#ebooks" className="text-light">Ebooks Library</a></li>
              <li><a href="#themes" className="text-light">Free Themes</a></li>
              <li><a href="#affiliates" className="text-light">Affiliates</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>Copyright © 2011–2024 Pixelgrade. Enjoy the rest of your Saturday!</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
