import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { Container, Row, Button, Col } from "react-bootstrap"

const CheckEmailPage = () => {
  return (
    <Container fluid className="check-email-page-container p-3">
      <div className="text-center check-email-page__inner d-flex flex-column justify-content-center">
        <Row className="justify-content-center">
          <FontAwesomeIcon icon={faEnvelope} size="3x" className="check-email-page__icon" />
        </Row>
        <Row className="justify-content-center">
          <h1 className="check-email-page__title">Check your email</h1>
        </Row>
        <Row className="justify-content-center">
          <p className="check-email-page__description">
            We&apos;ve sent you a confirmation link. Please check your email.
          </p>
        </Row>

        <div className="mt-5">
          <Row className="align-items-center justify-content-center">
            
            <p style={{width: "fit-content"}}>Didn&apos;t receive any?</p>
            <Button className="" style={{width: "125px"}} variant="outline-primary"> 
              Resend email
            </Button>
            
          </Row>
        </div>
      </div>
    </Container>
  )
}

export default CheckEmailPage