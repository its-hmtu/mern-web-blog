import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "images/logo.png"
import PostCard from "./components/PostCard";
const ReadingListPage = () => {
  const [posts, setPosts] = React.useState([{
    user_image: "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/31047/af153cd6-9994-4a68-83f4-8ddf3e13f0bf.jpg",
    full_name: "Sloan",
    title: "Meme monday",
    date: "Jan 1 (7 hours ago)",
    read_time: 2,
    link: "/",
    tag: ["#discussion", "#code"],
  }])
  return (
    <Container fluid className="reading-list-page__container">
      <Row>
        <Row>
          <h2 className="fw-bold">Reading list ({0})</h2>

          {/* Search bar */}
        </Row>
        <Row className="mt-3 gap-3">
          <Col className="col-2 col-tag-sort p-0">
            <ul>
              <li>
                <Button variant="outline-primary" className="">
                  All categories
                </Button>
              </li>

              {
                posts.map((post, index) => (
                  post.tag.map((tag, index) => (
                    <li key={index}>
                      <Button variant="outline-primary" className="">
                        {tag}
                      </Button>
                    </li>
                  ))
                ))
              }
            </ul>
          </Col>
          <Col className="col-5 flex-grow-1 col-post">
            <Card>
              <Card.Body>
                {
                  posts.map((post, index) => (
                    <PostCard key={index} data={post} />
                  ))
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ReadingListPage;
