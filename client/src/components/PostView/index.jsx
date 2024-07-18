import { getSinglePostQuery } from "hooks/post";
import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import "styles/index.scss";

const PostView = () => {
  const { path } = useParams();
  const { data, isLoading } = useQuery(getSinglePostQuery(path));

  useEffect(() => {
    console.log(data);
    console.log(path);
  }, [data]);

  return (
    <Container className="post-view__container" fluid>
      <Card className="post-view__card">
        <Card.Img
          variant="top"
          src={data?.main_image}
          className="post-view__main-image"
        />
        <Card.Body>
          <Card.Title className="post-view__title">{data?.title}</Card.Title>
          <Row className="mt-2">
            <Card.Text className="post-view__tags">
              #{data?.category_name}
            </Card.Text>
          </Row>
          <Row>
            <Card.Text className="post-view__author">
              <Row className="align-items-center p-3">
                <img
                  src={data?.profile_image_url}
                  alt=""
                  className="blog-card__user-img"
                  style={{
                    maxWidth: "48px",
                    height: "48px",
                  }}
                />

                <Row style={{
                      width: "fit-content",
                    }}>
                  <Link
                    className="fw-semibold"
                  >
                    {data?.author}
                  </Link>
                  <span className="post-view__date">
                    {new Date(data?.createdAt).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </Row>
              </Row>
            </Card.Text>
          </Row>
          <Card.Text>
            <article className="fw-medium p-3 post-view__content" dangerouslySetInnerHTML={{ __html: data?.content }}></article>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostView;
