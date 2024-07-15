import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="display-4">Dashboard</h1>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">0</Card.Title>
              <Card.Subtitle className="text-center text-muted">
                Total post reactions
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">0</Card.Title>
              <Card.Subtitle className="text-center text-muted">
                Total post comments
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">&lt; 500</Card.Title>
              <Card.Subtitle className="text-center text-muted">
                Total post views
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Posts <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Series <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Followers <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following tags{' '}
              <span className="badge bg-primary rounded-pill">2</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following users{' '}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following organizations{' '}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following podcasts{' '}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item>Analytics</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Hidden tags{' '}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col
          md={9}
          className="d-flex align-items-center justify-content-center"
        >
          <Card className="text-center">
            <Card.Body>
              <img
                src="https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/31047/af153cd6-9994-4a68-83f4-8ddf3e13f0bf.jpg"
                alt="Placeholder"
                className="img-fluid mb-3"
                style={{ maxWidth: '150px' }}
              />
              <Card.Text>
                This is where you can manage your posts, but you haven't written
                anything yet.
              </Card.Text>
              <Button variant="primary">Write your first post now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
