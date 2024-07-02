import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import logo from "images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";

const BlogCard = ({ data }) => {
  return (
    <Card className="blog-card">
      <div
        className="blog-card__img"
        style={{ aspectRatio: "auto 1000 / 420" }}
      >
        <Card.Img
          className="blog-card__img"
          variant="top"
          src={data.image}
          // src={logo}
        />
      </div>

      <Card.Body className="blog-card__body">
        <Link to={"/"} className="">
          <Row className="gap-0 px-3 mb-3">
            <img src={data.user_image} className="blog-card__user-img" />

            <div className="blog-card__info d-flex flex-column justify-content-center">
              <p className="blog-card__user-name">{data.full_name}</p>
              <p className="blog-card__date">Jan 1 (7 hours ago)</p>
            </div>
          </Row>
        </Link>
        <Card.Title className="blog-card__title">
          <Link>{data.title}</Link>
        </Card.Title>
        <Card.Text className="blog-card__text">
          <Row className="gap-0 px-2">
            {data.tags.map((tag, index) => (
              <Link key={index} className="blog-card__text-tag">
                <span>{tag}</span>
              </Link>
            ))}
          </Row>
        </Card.Text>

        <Row className="gap-0 px-3 mb-3 justify-content-between blog-card__misc">
          <Col>
            <Button>👍 {data.like} like</Button>
            <Button>💬 {data.comment} comment</Button>
          </Col>

          <Col>
            <span className="read-time">{data.read_time} min read</span>
            <Button className="btn-bookmark">
              <FontAwesomeIcon icon={faBookmarkOutline} />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
