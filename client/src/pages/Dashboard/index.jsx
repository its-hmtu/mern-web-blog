import { AuthContext } from "contexts/AuthContext";
import { getPostsQuery, useDeletePost } from "hooks/post";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, FormSelect, Modal, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Form, Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sort, setSort] = useState("recent");
  const { data: posts, isLoading } = useQuery(
    getPostsQuery(1, 20, `${sort === "recent" ? "desc" : "asc"}`, "", "", user?._id)
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {mutate: deletePost, isLoading: isDeletingPost} = useDeletePost(() => {
    console.log("Post deleted");
    setShowModal(false);
  });

  const handleSort = (e) => {
    setSort(e.target.value);
  };


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
              <Card.Title className="text-center">
                {
                  // get views count of all posts
                  user?.total_views
                }
              </Card.Title>
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
              Posts <span className="badge bg-primary rounded-pill">{user?.posts_count}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Followers <span className="badge bg-primary rounded-pill">{user?.followers_count}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following categories{" "}
              <span className="badge bg-primary rounded-pill">{user?.following_categories.length}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Following users{" "}
              <span className="badge bg-primary rounded-pill">{user?.following.length}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col
          md={9}
          className="d-flex align-items-center justify-content-center"
        >
          {user?.posts_count > 0 ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0">Your Posts</h4>

                <FormSelect className="w-25" 
                  onChange={handleSort}
                >
                  <option value="recent">Recent</option>
                  <option value="oldest">Oldest</option>
                </FormSelect>
              </div>
              <ul
                style={{
                  boxShadow: "0 0 0 1px rgba(23, 23, 23, 0.05)",
                }}
              >
                {posts?.posts?.map((post, index) => (
                  <li key={index} className="">
                    <div className="d-flex justify-content-between">
                      <h5 className="w-75">
                        <Link
                          to={`/post/${post.slug}`}
                          className="text-decoration-none"
                        >
                          {post.title}
                        </Link>
                      </h5>
                      <div className="d-flex gap-3 actions-group">
                        <Button
                          onClick={() => {
                            setShowModal(true);
                            setSelectedPost(post._id);
                          }}
                        >Delete</Button>
                        <Button
                          as={Link}
                          to={`/edit-post/:path`.replace(":path", post.slug)}
                        >Edit</Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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

      {<Modal 
        show={showModal}
        onHide={() => {}}
        className="mt-5"
        >
        <Modal.Header>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >Close</Button>
          <Button variant="danger" 
            onClick={() => {
              deletePost(selectedPost);
            }}
          >
            {isDeletingPost ? <Spinner 
              animation="border"
              role="status"
              size="sm"
            ></Spinner> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>}
    </Container>
  );
};

export default Dashboard;
