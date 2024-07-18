import React from "react";
import logo from "images/logo.png";
import { useRef, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ToolTip from "src/components/ToolTip";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginUser } from "hooks/user";
import { GoogleLogin } from "@react-oauth/google";

const SignInPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [captValue, setCaptValue] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { mutate, data, isLoading, error } = useLoginUser(
    async(data) => {
      console.log(data);
      navigate("/", {replace: true})
    },
    (error) => {
      errorRef.current = error;
    }
  );

  const ref = useRef();
  const errorRef = useRef(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSetCaptValue = () => {
    setCaptValue(!captValue);
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

  useEffect(() => {
    if (captValue && Object.values(userInfo).every((val) => val !== "")) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [captValue, userInfo]);

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
    mutate(userInfo);
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
            {error && (
              <Row className="sign-in-form__error-wrapper">
                <p
                  ref={errorRef}
                  className="sign-in-form__error  my-3 fw-semibold"
                >
                  {error.response.data.message}
                </p>
              </Row>
            )}

            <Form.Group>
              <Form.Label className="fw-semibold">
                Email
                <ToolTip id="email" title="* - required">
                  <span
                    className="required"
                    style={{ color: "#dc2626", marginLeft: "10px" }}
                  >
                    *
                  </span>
                </ToolTip>
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                onChange={handleUserInfoChange}
              />
            </Form.Group>

            <Form.Group className="password-group">
              <Form.Label className="fw-semibold">
                Password
                <ToolTip id="password" title="* - required">
                  <span
                    className="required"
                    style={{ color: "#dc2626", marginLeft: "10px" }}
                  >
                    *
                  </span>
                </ToolTip>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={handleUserInfoChange}
                />
                <Button
                  variant="primary"
                  onClick={handleShowPassword}
                  style={{ minWidth: "50px" }}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleSetCaptValue}
            />

            <Row className="px-3 flex-column gap-3">
              <Button
                className="sign-in-btn"
                variant="primary"
                type="submit"
                onClick={handleOnSubmit}
                disabled={!isSubmit}
              >
                {isLoading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    style={{ maxHeight: "24px", height: "24px", width: "24px" }}
                  />
                ) : (
                  "Sign in"
                )}
              </Button>
              <span className="fw-semibold text-center">or</span>
              {/* {<Button variant="outline-dark" className="sign-in-btn__google">
                <Col className="d-flex align-items-center ">
                  <FontAwesomeIcon icon={faGoogle} />
                  <span className="d-flex w-100 justify-content-center">
                    Continue with Google
                  </span> 
                </Col>
              </Button>} */}
              <div  className="d-flex w-100 justify-content-center">
                <GoogleLogin 
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
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
                Don't have an account?{" "}
                <Link to="/register" className="fw-semibold">
                  Register
                </Link>
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
