import logo from 'images/logo.png'
import google from 'images/gog.png'
import React, { useEffect, useRef } from 'react';
import { Container, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <img className='signin-logo' src={logo} alt="DEV comunity" />
          </a>
          <h1 className='signin-title'>Join the DEV Community</h1>
          <p className='signin-description'>DEV Community is a community of 1,625,044 amazing developers</p>
        </div>
        <div className="sign-in-container-inner">
          <Col sm={12}>
            <div className="sign-in-box">
              <Button variant="light" className="login-button" block>
                <p><img src={google} alt="" /></p>
                <p>Continue with Google</p>
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