import logo from "images/logo.png";
import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLoginUser } from "hooks/user";

const SignInPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const { mutate, data, isLoading, error } = useLoginUser(
    data => {
      console.log(data);
    }, 
    error => {
      errorRef.current = error;
    }
  )
  const ref = useRef();
  const errorRef = useRef(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    if (error) {
      // scroll to error but left a space on top
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error]);

  const handleUserInfoChange = (e) => {
    const newInfo = { ...userInfo };
    newInfo[e.target.id] = e.target.value;
    setUserInfo(newInfo);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(userInfo);
    // check if all fields are filled
    if (Object.values(userInfo).some((val) => val === "")) {
      return;
    }
    mutate(userInfo)
  };

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
          {
            error && (
            <Row className="sign-in-form__error-wrapper">
              <p ref={errorRef} className="sign-in-form__error  my-3 fw-semibold">{error.response.data.message}</p>
            </Row>)
          }
            <Form.Group>
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control type="email" id="email" ref={ref} onChange={handleUserInfoChange}/>
            </Form.Group>

            <Form.Group className="password-group">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <InputGroup>
                <Form.Control type={showPassword ? "text" : "password"} id="password" onChange={handleUserInfoChange}/>
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
                onClick={handleOnSubmit}
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
