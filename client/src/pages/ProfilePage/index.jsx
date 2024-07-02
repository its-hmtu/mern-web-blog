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
  const [user, setUser] = React.useState({
    full_name: "Ben Halpern",
    user_name: "@ben_halpern",
    user_image: "https://media.dev.to/cdn-cgi/image/width=50,height=50,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1%2Ff451a206-11c8-4e3d-8936-143d0a7e65bb.png",
    bio: 'Hi, I am Ben Halpern. I am a software developer and the co-founder of DEV. I love to write about programming and software development. I am also a big fan of memes.',
    location: 'New York, USA',
    joined: 'Jan 1, 2021'
  });
  const [blogs, setBlogs] = React.useState(
    [
      {
        id: 1,
        title: 'Meme Monday',
        full_name: 'Ben Halpern',
        user_image: 'https://media.dev.to/cdn-cgi/image/width=50,height=50,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1%2Ff451a206-11c8-4e3d-8936-143d0a7e65bb.png',
        date: 'Jan 1 (7 hours ago)',
        tags: ['#discuss', '#code'],
        like: 10,
        comment: 2,
        read_time: 2,
        image: 'https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F08vdwnxq29iztqhshcye.png'
      },
      {
        id: 2,
        title: 'Meme Monday',
        full_name: 'Ben Halpern',
        user_image: 'https://media.dev.to/cdn-cgi/image/width=50,height=50,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1%2Ff451a206-11c8-4e3d-8936-143d0a7e65bb.png',
        date: 'Jan 1 (7 hours ago)',
        tags: ['#discuss', '#code'],
        like: 10,
        comment: 2,
        read_time: 3,
        image: 'https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F08vdwnxq29iztqhshcye.png'
      }
    ]
  )
  return (
    <Container fluid className="profile-page__container">
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <Card className="profile-card w-100 d-flex flex-column align-items-center p-4 position-relative">
            <img src={user.user_image} alt="" className="profile-page__img" />
            <Button variant="primary" className="mt-3 position-absolute">
              Edit Profile
            </Button>
            <Card.Body>
              <Card.Title className="mt-3 profile-card-title">
                {user.full_name}
              </Card.Title>
              <Card.Text className="mt-3 profile-card-text">
                {user.bio}
              </Card.Text>
            </Card.Body>
            <Row className="info-misc">
              <Col>
                <span className="mx-3">
                  <FontAwesomeIcon icon={faLocationDot} className="me-2"/>
                  {user.location}
                  </span>
                <span className="mx-3">
                  <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                  Joined {user.joined}
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
            {
              blogs.map((blog, index) => (
                <BlogCard key={index} data={blog} />
              ))
            }
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default ProfilePage;
