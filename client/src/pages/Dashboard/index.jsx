import { AuthContext } from "contexts/AuthContext";
import { getPostsQuery } from "hooks/post";
import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { data: posts, isLoading } = useQuery(
    getPostsQuery(1, 10, "desc", "", "", user?._id)
  );

  useEffect(() => {
    console.log(posts);
  });

  return (
    <Container className="dashboard__container">
      <Row>
        <Col>
          <h1 className="">Dashboard</h1>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {user?.total_likes}
              </Card.Title>
              <Card.Subtitle className="text-center text-muted">
                Total post likes
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {user?.comments_count}
              </Card.Title>
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
              Following tags{" "}
              <span className="badge bg-primary rounded-pill">2</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following users{" "}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following organizations{" "}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following podcasts{" "}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
            <ListGroup.Item>Analytics</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Hidden tags{" "}
              <span className="badge bg-primary rounded-pill">0</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col
          md={9}
          className="d-flex align-items-center justify-content-center"
        >
          {user?.posts_count > 0 ? (
            <div>
              {
                posts?.posts?.map((post, index) => (
                  <Card key={index} className="mb-3" style={{
                    boxShadow: "0 0 0 1px rgba(23, 23, 23, 0.05)"
                  }}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
          ) : (
            <Card className="text-center">
              <Card.Body>
                <img
                  src="https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/31047/af153cd6-9994-4a68-83f4-8ddf3e13f0bf.jpg"
                  alt="Placeholder"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "150px" }}
                />
                <Card.Text>
                  This is where you can manage your posts, but you haven't
                  written anything yet.
                </Card.Text>
                <Button variant="primary">Write your first post now</Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
