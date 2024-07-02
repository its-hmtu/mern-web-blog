import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import logo from "images/logo.png";
import BlogCard from "src/components/BlogCard";
import {
  faNewspaper,
  faComment,
  faTag,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const ProfilePage = () => {
  return (
    <Container fluid className="profile-page__container">
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <Card className="profile-card w-100 d-flex flex-column align-items-center p-4 position-relative">
            <img src={logo} alt="" className="profile-page__img" />
            <Button variant="primary" className="mt-3 position-absolute">
              Edit Profile
            </Button>
            <Card.Body>
              <Card.Title className="mt-3 profile-card-title">
                John Doe
              </Card.Title>
              <Card.Text className="mt-3 profile-card-text">bio</Card.Text>
            </Card.Body>
            <Row className="info-misc">
              <Col>
                <span className="mx-3">
                  <FontAwesomeIcon icon={faLocationDot} className="me-2"/>
                  Location
                  </span>
                <span className="mx-3">
                  <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                  Joined
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <div className="profile-page__content d-flex p-0 gap-3">
          <Col className="col-4">
            <Card className="summary-card">
              <Card.Body className="p-4">
                <Card.Text>
                  <FontAwesomeIcon icon={faNewspaper} className="me-3" />0 posts
                  published
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faComment} className="me-3" />0
                  comments written
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faTag} className="me-3" />0 categories
                  saved
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-5 flex-grow-1">
            <BlogCard />
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default ProfilePage;
