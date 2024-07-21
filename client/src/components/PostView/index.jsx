import {
  getPostCommentsQuery,
  getPostsQuery,
  getSinglePostQuery,
} from "hooks/post";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHandsBubbles,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "styles/index.scss";
import { getUserQuery } from "hooks/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostView = () => {
  const { path } = useParams();
  const { data, isLoading } = useQuery(getSinglePostQuery(path));
  const { data: author, isLoading: authorLoading } = useQuery(
    getUserQuery(data?.user_id)
  );
  const { data: comments, isLoading: commentsLoading } = useQuery(
    getPostCommentsQuery(data?._id)
  );
  const [paramsPost, setParamsPost] = useState({
    page: 1,
    limit: 10,
    order: "asc",
    category: "",
  });
  useEffect(() => {
    if (author && author?.posts) {
      setParamsPost((prevParams) => ({
        ...prevParams,
        postIds: author?.posts.join(","),
      }));
    }
  }, []);
  const { data: posts, isLoading: postsLoading } = useQuery(
    getPostsQuery(
      paramsPost.page,
      paramsPost.limit,
      paramsPost.order,
      paramsPost.category,
      paramsPost.postIds
    )
  );

  useEffect(() => {
    // console.log(data);
    // console.log(path);
    // console.log(posts);
    // console.log(comments);

    window.scrollTo(0, 0);
  }, []);

  const modules = {
    toolbar: [
      "bold",
      "italic",
      "underline",
      "strike",
      "link",
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
  ];

  return (
    <Container className="post-view__container position-relative" fluid>
      <Col className="action-buttons position-fixed align-items-center">
        <Button variant="outline-primary" className="">
          <FontAwesomeIcon icon={faHeart} />
        </Button>
        <span className="mb-2">{data?.likes_count}</span>
        <Button variant="outline-primary" className="">
          <FontAwesomeIcon icon={faComment} />
        </Button>
        <span className="mb-2">{data?.comments_count}</span>
        <Button variant="outline-primary">
          <FontAwesomeIcon icon={faBookmark} />
        </Button>
      </Col>
      <Row className="gap-2 justify-content-end">
        <Col className="col-8">
          <Card className="post-view__card">
            <Card.Img
              variant="top"
              src={data?.main_image}
              className="post-view__main-image"
            />
            <Card.Body>
              <Card.Title className="post-view__title">
                {data?.title}
              </Card.Title>
              <Row className="mt-2">
                <Card.Text className="post-view__tags">
                  #{data?.category_name}
                </Card.Text>
              </Row>
              <Row>
                <Card.Text className="post-view__author">
                  <Row className="align-items-center p-3 ">
                    <img
                      src={data?.profile_image_url}
                      alt=""
                      className="blog-card__user-img p-0"
                      style={{
                        maxWidth: "48px",
                        height: "48px",
                      }}
                    />

                    <Row
                      style={{
                        width: "fit-content",
                      }}
                    >
                      <Link className="fw-semibold">{data?.author}</Link>
                      <span className="post-view__date">
                        {new Date(data?.createdAt).toLocaleDateString(
                          undefined,
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </Row>
                  </Row>
                </Card.Text>
              </Row>
              <Card.Text>
                <article
                  className="fw-medium p-3 post-view__content"
                  dangerouslySetInnerHTML={{ __html: data?.content }}
                ></article>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-4 p-3">
            <Card.Title className="px-4 fw-bold">Comments</Card.Title>

            <Row className="px-4 mt-4 flex-nowrap w-100">
              <img
                src={data?.profile_image_url}
                alt=""
                className="blog-card__user-img"
                style={{
                  maxWidth: "48px",
                  height: "48px",
                }}
              />

              <ReactQuill
                className="mx-2 me-4 pe-5"
                theme="snow"
                // value={content}
                // onChange={
                //   handleChange
                // }
                modules={modules}
                formats={formats}
                placeholder="Add comment"
              ></ReactQuill>
            </Row>

            {
              data && comments?.map((comment, index) => (
                <Row key={index} className="mt-5 px-4 align-items-center flex-nowrap w-100">
                  <img
                    src={comment?.profile_image_url}
                    alt=""
                    className="blog-card__user-img me-4 mt-2"
                    style={{
                      maxWidth: "48px",
                      height: "48px",
                    }}
                  />

                  <Card.Text className="flex-grow-1 card-comment w-75 py-3 mt-2">
                    <Row className="flex-nowrap align-items-center w-100">
                      <Link className="fw-semibold text-decoration-none" style={{
                        width: "fit-content",
                      }}>
                        {comment?.author}
                        </Link>
                      <small className="pm-0 p-0 fw-semibold">{new Date(comment?.createdAt).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}</small>
                    </Row>
                    <span className="ms-2" dangerouslySetInnerHTML={{__html: comment?.content}}></span>
                  </Card.Text>
                </Row>
              ))
            }
          </Card>

          <Card className="mt-4 p-3">
            <Card.Title className="px-4 fw-bold">Read next</Card.Title>

            <Row className="px-4 mt-4 flex-nowrap w-100">
              <img
                src={data?.profile_image_url}
                alt=""
                className="blog-card__user-img"
                style={{
                  maxWidth: "48px",
                  height: "48px",
                }}
              />

              <ReactQuill
                className="mx-2 me-4 pe-5 flex-grow-1"
                theme="snow"
                // value={content}
                // onChange={
                //   handleChange
                // }
                modules={modules}
                formats={formats}
                placeholder="Add comment"
              ></ReactQuill>
            </Row>
          </Card>
        </Col>

        <Col className="col-3">
          <Card className="card-more-from-user mt-3">
            <Card.Body>
              <Card.Title className="px-0 mb-3">
                More from
                <span className="fw-semibold ms-1">
                  {data?.author}
                </span>
              </Card.Title>
              {posts?.posts
                ?.filter((post) => post?._id !== data?._id)
                ?.map((post, index) => (
                  <Card.Text key={index} className="mt-2 border-bottom pb-3">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-decoration-none fw-semibold"
                    >
                      {post.title}
                    </Link>

                    <Row
                      className="mt-2 ms-1"
                      style={{
                        width: "fit-content",
                      }}
                    >
                      <Badge bg="secondary">
                        <span className="post-view__tags">
                          #{post.category_name}
                        </span>
                      </Badge>
                    </Row>
                  </Card.Text>
                ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostView;
