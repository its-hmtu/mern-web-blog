import React from 'react';
import { Container, Row, Col, Card, Button, Form, Nav } from 'react-bootstrap';

const SettingsPage = () => {
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link active>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Customization</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Notifications</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Organization</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Extensions</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9}>
          <ProfileSection />
          <BasicSection />
          <CodingSection />
          <PersonalSection />
          <WorkSection />
          <BrandingSection />
          <Button variant="primary" className="mt-3">
            Save Profile Information
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const ProfileSection = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>User</Card.Title>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Check type="checkbox" label="Display email on profile" />
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter your username" />
        </Form.Group>
        <Form.Group controlId="formProfileImage">
          <Form.Label>Profile image</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

const BasicSection = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Basic</Card.Title>
      <Form>
        <Form.Group controlId="formWebsiteURL">
          <Form.Label>Website URL</Form.Label>
          <Form.Control type="text" placeholder="https://yoursite.com" />
        </Form.Group>
        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter your location" />
        </Form.Group>
        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="A short bio..." />
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

const CodingSection = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Coding</Card.Title>
      <Form>
        <Form.Group controlId="formLearning">
          <Form.Label>Currently learning</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What are you learning right now?"
          />
        </Form.Group>
        <Form.Group controlId="formAvailableFor">
          <Form.Label>Available for</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What kinds of collaborations or discussions are you available for?"
          />
        </Form.Group>
        <Form.Group controlId="formSkills">
          <Form.Label>Skills/Languages</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Any languages, frameworks, etc. to highlight?"
          />
        </Form.Group>
        <Form.Group controlId="formHackingOn">
          <Form.Label>Currently hacking on</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What projects are currently occupying most of your time?"
          />
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

const PersonalSection = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Personal</Card.Title>
      <Form>
        <Form.Group controlId="formPronouns">
          <Form.Label>Pronouns</Form.Label>
          <Form.Control type="text" placeholder="Enter your pronouns" />
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

const WorkSection = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Work</Card.Title>
      <Form>
        <Form.Group controlId="formWork">
          <Form.Label>Work</Form.Label>
          <Form.Control
            type="text"
            placeholder="What do you do? Example: CEO at ACME Inc."
          />
        </Form.Group>
        <Form.Group controlId="formEducation">
          <Form.Label>Education</Form.Label>
          <Form.Control type="text" placeholder="Where did you go to school?" />
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

const BrandingSection = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Branding</Card.Title>
      <Form>
        <Form.Group controlId="formBrandColor">
          <Form.Label>Brand color</Form.Label>
          <Form.Control type="color" defaultValue="#000000" />
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

export default SettingsPage;
