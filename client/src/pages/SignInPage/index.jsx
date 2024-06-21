import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoSvg } from 'svg/Logo';

const SignInPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const ref = useRef()

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <div className='sign-in-wrapper'>
      <Container fluid className="sign-in-container">
        <div className='logo-wrapper'>
          <LogoSvg />
        </div>
        <div className="sign-in-container-inner">
          <Col sm={12}>
            <div className="sign-in-box">
              <h1 className="text-start">Sign in</h1>
              <p className="text-start">You know how much a squirrel misses his nuts? Yep, that is how much we missed you. <strong>Welcome back.</strong></p>
              <Form>
                <Form.Group>
                  {/* <Form.Label>Username or Email Address</Form.Label> */}
                  <Form.Control type="email" placeholder="Enter username or email address" ref={ref}/>
                </Form.Group>

                <Form.Group className='password-group'>
                  {/* <Form.Label>Password</Form.Label> */}
                  <InputGroup>
                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Enter password" />
                    <Button variant="dark" onClick={handleShowPassword}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Check type="checkbox" label="Stay signed in for longer" />
                </Form.Group>

                <Button className='sign-in-btn' variant="primary" type="submit" block>
                  Sign into your account →
                </Button>
              </Form>

              <div className="alternative-login text-center">
                  <div className="separator">
                      <hr className="left-line" />
                      <span>or</span>
                      <hr className="right-line" />
                  </div>
                  <Button variant="light" block>
                      Continue with Google
                  </Button>
                  <p>
                    <Link to="/register">
                      Sign up for free
                    </Link>
                    <span className='dot-seperator'></span>
                    <a href="#">Forgot password?</a>
                  </p>
              </div>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;