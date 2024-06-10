import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoSvg } from 'svg/Logo';

const RegisterPage = () => {
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
              <h1 className="text-start">Sign up</h1>
              <p className="text-start">Come and join the Pixelgrade community! We’ve prepared some unique perks to help you get started and configure your website in style. <strong>Peek inside for free</strong> and find some great little treats for you.</p>
              <Form>
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="email" placeholder="Enter first name" ref={ref}/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email address and password</Form.Label>
                  <Form.Control type="email" placeholder="Enter email address" ref={ref}/>
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
                  <Form.Check type="checkbox" label="I agree to Pixelgrade's terms and conditions and privacy policy." />
                </Form.Group>

                <Button className='sign-in-btn' variant="primary" type="submit" block>
                  Set up my account →
                </Button>
              </Form>

              <Link to={'/signin'} className="back-to-sign-in text-start">
                <Button variant="link" block>
                  ← Sign in
                </Button>
              </Link>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;