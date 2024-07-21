import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { Container, Row, Button, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const EmailVerified = () => {
  return (
    <Container fluid className="check-email-page-container p-3">
      <div className="text-center check-email-page__inner d-flex flex-column justify-content-start mt-5">
        <Row className="justify-content-center">
          <FontAwesomeIcon icon={faCheck} size="3x" className="check-email-page__icon" style={{
            color: "#28a745"
          }}/>
        </Row>
        <Row className="justify-content-center">
          <h1 className="check-email-page__title">Email verified</h1>
        </Row>
        <Row className="justify-content-center">
          <Link className="check-email-page__description" to={"/signin"}>
            Continue to sign in
          </Link>
        </Row>
      </div>
    </Container>
  )
}

export default EmailVerified