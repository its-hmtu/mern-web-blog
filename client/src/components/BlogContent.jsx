import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BlogContent = () => {
  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Img variant="top" src="https://via.placeholder.com/800x400" />
            <Card.Body>
              <Card.Title>Crafting furniture that lasts and tells a story</Card.Title>
              <Card.Text>
                Discover the story of a small furniture design where each piece has a story to tell.
              </Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
            <Card.Body>
              <Card.Title>Rethinking the way we travel and wander</Card.Title>
              <Card.Text>
                We can do better when it comes to traveling and exploring the world. Learn how you can do it more mindfully.
              </Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
            <Card.Body>
              <Card.Title>Cooking as a form of self-expression</Card.Title>
              <Card.Text>
                Explore how cooking can be a creative outlet and a form of self-expression.
              </Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
            <Card.Body>
              <Card.Title>Contributing to humanity through architecture</Card.Title>
              <Card.Text>
                Learn about the architects who are making a difference through their innovative designs.
              </Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogContent;
