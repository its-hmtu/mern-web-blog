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
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [isReplyEdit, setIsReplyEdit] = useState(false);
  const [activeReply, setActiveReply] = useState(null);

  const handleReplyClick = (commentId) => {
    // Toggle the reply box for the clicked comment
    setActiveReply(prev => prev === commentId ? null : commentId);
  };
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
    // window.scrollTo(0, 0);
  }, []);

  const handleCommetEdit = () => {
    setIsCommentEdit(!isCommentEdit);
  };

  const handleReplyEdit = () => {
    setIsReplyEdit(!isReplyEdit);
  }

  const modules = {
    toolbar: ["bold", "italic", "underline", "strike", "link"],
  };

  const formats = ["bold", "italic", "underline", "strike", "link"];

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
                      <h3 className="fw-semibold">{data?.author}</h3>
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

          <Card
            className="mt-4 p-3"
            style={{
              minHeight: "300px",
            }}
          >
            <Card.Title className="px-4 fw-bold">Comments</Card.Title>

            <div className="px-4 mt-4 d-flex w-100">
              <img
                src={data?.profile_image_url}
                alt=""
                className="blog-card__user-img"
                style={{
                  maxWidth: "48px",
                  width: "48px",
                  height: "48px",
                }}
              />

              <ReactQuill
                className="mx-2 w-100"
                theme="snow"
                // value={content}
                // onChange={
                //   handleChange
                // }
                modules={modules}
                formats={formats}
                placeholder="Add comment"
              ></ReactQuill>
            </div>

            {/* {data &&
              comments?.comments.map((comment, index) => (
                
              ))} */}

            {data &&
              comments?.comments
                // Step 1: Filter out parent comments
                .filter((comment) => !comment.reply_to)
                .map((parentComment, index) => (
                  <div key={index} className="position-relative mt-5">
                    <div className=" px-4 align-items-center d-flex">
                      <img
                        src={parentComment?.profile_image_url}
                        alt=""
                        className="blog-card__user-img me-4 mt-2"
                        style={{
                          maxWidth: "48px",
                          width: "48px",
                          height: "48px",
                        }}
                      />
                      <Card.Text className="flex-grow-1 card-comment p-3 mt-2">
                        <div className="d-flex align-items-center">
                          <h6
                            className="fw-semibold text-decoration-none m-0 me-1"
                            style={{
                              width: "fit-content",
                            }}
                          >
                            {parentComment?.user_name}
                          </h6>
                          <small className="m-0 p-0 fw-semibold">
                            •{" "}
                            {new Date(
                              parentComment?.createdAt
                            ).toLocaleDateString(undefined, {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </small>
                        </div>
                        <span
                          className="ms-2"
                          dangerouslySetInnerHTML={{
                            __html: parentComment?.content,
                          }}
                        ></span>
                      </Card.Text>
                    </div>
                    {activeReply === parentComment._id && (
                      <Button
                        style={{
                          borderRadius: "14px",
                          padding: "4px",
                          backgroundColor: "#f8f9fa",
                          color: "#000",
                          borderColor: "#f8f9fa",
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "100px",
                        }}
                        onClick={() => handleReplyClick(parentComment._id)}
                      >
                        <FontAwesomeIcon icon={faHandsBubbles} />
                        <span
                          className="ms-2"
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          Reply
                        </span>
                      </Button>
                    )}

                    {!activeReply === parentComment._id && (
                      <div className="mt-3">
                        <ReactQuill
                          style={{
                            marginLeft: "70px",
                            width: "calc(100% - 100px)",
                          }}
                          theme="snow"
                          // value={content}
                          // onChange={
                          //   handleChange
                          // }
                          modules={modules}
                          formats={formats}
                          placeholder="Add comment"
                        />

                        <div className="d-flex gap-2 mt-2 justify-content-end me-4">
                          <Button
                            style={{
                              fontSize: "14px",
                              borderRadius: "14px",
                            }}
                          >
                            Comment
                          </Button>
                          <Button
                            variant="dark"
                            style={{
                              fontSize: "14px",
                              borderRadius: "14px",
                            }}
                            onClick={handleCommetEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {comments?.comments
                      .filter((reply) => reply.reply_to === parentComment._id) // Assuming _id is the identifier for comments
                      .map((reply, replyIndex) => (
                        <div key={replyIndex} className="position-relative">
                          <div className="mt-2 px-4 ms-5 align-items-center d-flex">
                            <img
                              src={reply?.profile_image_url}
                              alt=""
                              className="blog-card__user-img me-4 mt-2"
                              style={{
                                maxWidth: "48px",
                                width: "48px",
                                height: "48px",
                              }}
                            />
                            <Card.Text className="flex-grow-1 card-comment p-3 mt-2">
                              <div className="d-flex align-items-center">
                                <h6
                                  className="fw-semibold text-decoration-none m-0 me-1"
                                  style={{
                                    width: "fit-content",
                                  }}
                                >
                                  {reply?.user_name}
                                </h6>
                                <small className="m-0 p-0 fw-semibold">
                                  •Hello{" "}
                                  {new Date(
                                    reply?.createdAt
                                  ).toLocaleDateString(undefined, {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </small>
                              </div>
                              <span
                                className="ms-2"
                                dangerouslySetInnerHTML={{
                                  __html: reply?.content,
                                }}
                              ></span>
                            </Card.Text>
                          </div>
                          {!isReplyEdit && <Button
                            style={{
                              borderRadius: "14px",
                              padding: "4px",
                              backgroundColor: "#f8f9fa",
                              color: "#000",
                              borderColor: "#f8f9fa",
                              display: "flex",
                              alignItems: "center",
                              position: "absolute",
                              left: "20%",
                            }}
                            onClick={handleReplyEdit}
                          >
                            <FontAwesomeIcon icon={faHandsBubbles} />
                            <span
                              className="ms-2"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              Reply
                            </span>
                          </Button>}

                          {isReplyEdit && (
                            <div className="mt-3">
                              <ReactQuill
                                style={{
                                  marginLeft: "70px",
                                  width: "calc(100% - 100px)",
                                }}
                                theme="snow"
                                // value={content}
                                // onChange={
                                //   handleChange
                                // }
                                modules={modules}
                                formats={formats}
                                placeholder="Add comment"
                              />

                              <div className="d-flex gap-2 mt-2 justify-content-end me-4">
                                <Button
                                  style={{
                                    fontSize: "14px",
                                    borderRadius: "14px",
                                  }}
                                >
                                  Comment
                                </Button>
                                <Button
                                  variant="dark"
                                  style={{
                                    fontSize: "14px",
                                    borderRadius: "14px",
                                  }}
                                  onClick={handleReplyEdit}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
          </Card>
        </Col>

        <Col className="col-3">
          <Card className="card-more-from-more">
            <Card.Body>
              <Card.Title className="px-0 mb-3">
                More from
                <span className="fw-semibold ms-1">{data?.author}</span>
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
