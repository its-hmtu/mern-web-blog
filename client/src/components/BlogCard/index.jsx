import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import logo from "images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { getUserQuery } from "hooks/user";
import { useQuery } from "react-query";

const BlogCard = ({ data, hide = false }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const now = new Date();
    const postDate = new Date(data.createdAt);
    console.log(data.createdAt);
    const diffInMs = now - postDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) setTimeAgo("just now");
    if (diffInMinutes < 60) setTimeAgo(`${diffInMinutes} minutes ago`);
    if (diffInHours < 24) setTimeAgo(`${diffInHours} hours ago`);
    setTimeAgo(
      postDate.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, [data.createdAt]);

  return (
    <Card className="blog-card">
      {data.main_image && !hide && (
        <div
          className="blog-card__img"
          style={{ aspectRatio: "auto 1000 / 420" }}
        >
          <Card.Img
            className="blog-card__img"
            variant="top"
            src={data.main_image}
            // src={userData?.profile_image_url}
          />
        </div>
      )}

      <Card.Body className="blog-card__body">
        <Link to={"/"} className="">
          <Row className="gap-0 px-3 mb-3">
            <img src={data.profile_image_url} className="blog-card__user-img" />

            <div className="blog-card__info d-flex flex-column justify-content-center">
              <p className="blog-card__user-name">{data.author}</p>
              <p className="blog-card__date">{timeAgo}</p>
            </div>
          </Row>
        </Link>
        <Card.Title className="blog-card__title">
          <Link>{data.title}</Link>
        </Card.Title>
        <Card.Text className="blog-card__text">
          <Row className="gap-0 px-2">
            <Link className="blog-card__text-tag">
              <span>#{data.category_name}</span>
            </Link>
          </Row>
        </Card.Text>

        <Row className="gap-0 px-3 mb-3 justify-content-between blog-card__misc">
          <Col>
            {hide ? (<span>👍 {data.likes_count} like</span>) :
             ( <Button>👍 {data.likes_count} like</Button>)
            }
            {
              data.comments_count === 0 ? (
                <Button>💬 Add comment</Button>
              ) : (
                <Button>💬 {data.comments_count} comments</Button>
              )
            }
          </Col>

          <Col>
            <span className="read-time">{data.read_time} min read</span>
            {!hide && <Button className="btn-bookmark">
              <FontAwesomeIcon icon={faBookmarkOutline} />
            </Button>}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
