import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
  return (
    <Container className="notifications-page__container">
      <Row>
        <Row>
          <h2 className="fw-bold">Notifications</h2>

          {/* Search bar */}
        </Row>
        <Row className="mt-3 gap-3">
          <Col className="col-3 col-tag-sort p-0">
            <ul>
              <li>
                <Button variant="outline-primary" className="">
                  All
                </Button>
              </li>

              <li>
                <Button variant="outline-primary" className="">
                  Comments
                </Button>
              </li>

              <li>
                <Button variant="outline-primary" className="">
                  Posts
                </Button>
              </li>
            </ul>
          </Col>
          <Col className="col-5 flex-grow-1 col-post">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/31047/af153cd6-9994-4a68-83f4-8ddf3e13f0bf.jpg" alt="" />
                </Card.Title>

                <Card.Text className="text-center">
                  Sloan here! 👋 I noticed that you haven't asked a question or started a discussion yet. It's easy to do both of these; just click on 'Write a Post' in the sidebar of the tag page to get started!
                </Card.Text>

                <Card.Text className="text-center">
                  Visit
                  <Link to="/settings" className="ms-2">
                    Settings
                  </Link>
                  to manage your notifications.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default NotificationsPage;
