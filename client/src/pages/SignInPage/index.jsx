import logo from "images/logo.png";
import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignInPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const ref = useRef();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <Container fluid className="sign-in-container">
      <Row className="sign-in-container__inner justify-content-center">
        <img
          className="signin-logo"
          src={logo}
          alt="DEV comunity"
          style={{ width: "auto", height: "48px" }}
        />

        <Row className="justify-content-center text-center">
          <h3 className="signin-title fw-bold">Join the DEV Community</h3>
          <p className="signin-description">
            DEV Community is a community of 1,625,044 amazing developers
          </p>
        </Row>

        <Row sm={12} className="sign-in-form__wrapper">
          <Form className="px-0">
            <Form.Group>
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control type="email" ref={ref} />
            </Form.Group>

            <Form.Group className="password-group">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <InputGroup>
                <Form.Control type={showPassword ? "text" : "password"} />
                <Button variant="primary" onClick={handleShowPassword} style={{minWidth: "50px"}}>{
                  showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> 
                  }</Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="checkbox-group d-flex justify-content-between">
              <Form.Check type="checkbox" label="Remember me" />
              <a href="#" className="text-end fw-semibold" >
                Forgot password?
              </a>
            </Form.Group>

            <Row className="px-3 flex-column gap-3">
              <Button
                className="sign-in-btn"
                variant="primary"
                type="submit"
                block
              >
                Log in
              </Button>

              <Button variant="outline-dark" className="sign-in-btn__google" block>
                <Col className="d-flex align-items-center ">
                  <FontAwesomeIcon icon={faGoogle} />
                  <span className="d-flex w-100 justify-content-center">
                    Continue with Google
                  </span>
                </Col>
              </Button>
            </Row>
          </Form>
          <div className="sign-in-misc text-center my-4">
            <p className="fst-italic sign-in-misc__terms">
              By signing in, you are agreeing to our{" "}
              <a href="#">privacy policy</a>, <a href="#">terms of use</a> and{" "}
              <a href="#">code of conduct</a>.
            </p>
            <div className="sign-in-misc__sperator">
              <hr />
            </div>
            <div className="sign-in-misc__register">
              <p>
                New to DEV Community? <Link to="/register" className="fw-semibold">Create account</Link>
                .
              </p>
            </div>
          </div>
        </Row>
      </Row>
    </Container>
  );
};

export default SignInPage;
