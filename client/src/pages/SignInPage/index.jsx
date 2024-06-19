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

  // useEffect(() => {
  //   ref.current.focus()
  // }, [])

  return (
    <div className='sign-in-wrapper'>
      <Container fluid className="sign-in-container">
        <div className='logo-wrapper'>
          <h1>DEV</h1>  
        </div>
        <div className="sign-in-container-inner">
          <Col sm={12}>
            <div className="sign-in-box">
              <div className="text-start">
                <h1 >Join the DEV Community</h1>
                <p >DEV Community is a community of 1,625,044 amazing developers</p>
              </div>
              <Button variant="light" className="login-button" block>
                Continue with Google
              </Button>
            
              <div className="separator-top">
                <hr className="left-line" />
                  <span>or</span>
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
                    {/* <Button variant="dark" onClick={handleShowPassword}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button> */}
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