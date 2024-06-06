import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './signInPage.scss';

const signInPage = () => {
  return (
    <Container fluid className="signIn-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} md={6} lg={4}>
          <div className="signIn-box">
            <h1 className="text-center">Sign in</h1>
            <p className="text-center">You know how much a squirrel misses his nuts? Yep, that is how much we missed you. <strong>Welcome back.</strong></p>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Username or Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formCheckbox">
                <Form.Check type="checkbox" label="Stay signed in for longer" />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Sign into your account
              </Button>
            </Form>

            <div className="alternative-login text-center">
                <div className="separator">
                    <hr className="left-line" />
                    <span>or</span>
                    <hr className="right-line" />
                </div>
                <Button variant="light" block>
                    Continue with Email
                </Button>
                <p>
                    <a href="#">Sign up for free</a> | <a href="#">Forgot password?</a>
                </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;