import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { LogoSvg } from 'svg/Logo';

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
        <div className='signin-content'>
          <a href="" >
            <img className='signin-logo' src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt="DEV Community" />
          </a>
          <h1 className='signin-title'>Join the DEV Community</h1>
          <p className='signin-description'>DEV Community is a community of 1,625,044 amazing developers</p>
        </div>
        <div className="sign-in-container-inner">
          <Col sm={12}>
            <div className="sign-in-box">
              <Button variant="light" className="login-button" block>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="crayons-icon crayons-icon--default">
                  <path d="M18.09 18.75c2.115-1.973 3.052-5.25 2.49-8.393h-8.392v3.473h4.777a3.945 3.945 0 0 1-1.777 2.67l2.902 2.25Z" fill="#4285F4"></path>
                  <path d="M4.215 15.982A9 9 0 0 0 18.09 18.75l-2.902-2.25a5.37 5.37 0 0 1-8.018-2.813l-2.955 2.296Z" fill="#34A853"></path>
                  <path d="M7.17 13.687c-.375-1.17-.375-2.25 0-3.42L4.215 7.965a9.06 9.06 0 0 0 0 8.025l2.955-2.303Z" fill="#FBBC02"></path>
                  <path d="M7.17 10.267c1.035-3.24 5.438-5.115 8.393-2.347l2.58-2.528A8.85 8.85 0 0 0 4.215 7.965l2.955 2.302Z" fill="#EA4335"></path>
                </svg>
                Continue with Google
              </Button>
            
              <div className="separator-top">
                <hr className="left-line" />
                  <span>OR</span>
                <hr className="right-line" />
              </div>

              <Form>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={ref} />
                </Form.Group>

                <Form.Group className='password-group'>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control type={showPassword ? 'text' : 'password'} />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="checkbox-group">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a href="#" className="text-end">Forgot password?</a>
                </Form.Group>

                <Button className='sign-in-btn' variant="primary" type="submit" block>
                  Log in
                </Button>
              </Form>
              <div className="alternative-login text-center">
                <p>
                  By signing in, you are agreeing to our <a href="#">privacy policy</a>, <a href="#">terms of use</a> and <a href="#">code of conduct</a>.
                </p>
                <div className="separator-under">
                  <hr />
                </div>
                <div className="new-account">
                  <p>
                    New to DEV Community? <Link to="/register">Create account</Link>.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;