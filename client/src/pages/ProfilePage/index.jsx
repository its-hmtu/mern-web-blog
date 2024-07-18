import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Pagination,
  Form,
} from "react-bootstrap";
import BlogCard from "src/components/BlogCard";
import {
  faNewspaper,
  faComment,
  faTag,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { useQuery } from "react-query";
import { getPostsQuery } from "hooks/post";
import { getPaginationItems } from "utils/getPaginationItems";
import { getCurrentUserCommentsQuery } from "hooks/user";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [paramsPost, setParamsPost] = useState({
    page: 1,
    limit: 5,
    order: "desc",
    category: "",
    postIds: "",
  });

  useEffect(() => {
    if (user && user?.posts) {
      setParamsPost((prevParams) => ({
        ...prevParams,
        postIds: user?.posts.join(","),
      }));
    }
  }, []);

  const { data, isLoading } = useQuery(
    getPostsQuery(
      paramsPost.page,
      paramsPost.limit,
      paramsPost.order,
      paramsPost.category,
      paramsPost.postIds
    )
  );

  const { data: comments, isLoading: isLoadingComments } = useQuery(
    getCurrentUserCommentsQuery()
  );

  const totalPages = Math.ceil(data?.totalPosts / paramsPost.limit);
  const paginationItems = getPaginationItems(paramsPost.page, totalPages);

  useEffect(() => {
    console.log(comments);
  });
  return (
    <Container fluid className="profile-page__container">
      <Row className="w-100">
        <Col className="d-flex flex-column align-items-center">
          <Card className="profile-card w-100 d-flex flex-column align-items-center p-4 position-relative">
            <img
              src={user?.profile_image_url}
              alt=""
              className="profile-page__img"
            />
            <Button variant="primary" className="mt-3 position-absolute">
              Edit Profile
            </Button>
            <Card.Body>
              <Row>
                <Col className="d-flex flex-column justify-content-center">
                  <Card.Title className="mt-3 profile-card-title">
                    {user?.full_name}
                    <p className="fw-semibold">@{user?.user_name}</p>
                  </Card.Title>
                  {user?.role === "admin" && (
                    <Badge bg="success" className="mt-2">
                      Admin
                    </Badge>
                  )}
                </Col>
              </Row>

              <Card.Text className="mt-3 profile-card-text">
                <span className="fw-normal">
                  {user?.followers_count} followers
                </span>
                <p>{user?.bio}</p>
              </Card.Text>
            </Card.Body>
            <Row className="info-misc">
              <Col>
                {user?.location && (
                  <span className="mx-3">
                    <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                    {user?.location}
                  </span>
                )}
                {user?.createdAt && (
                  <span className="mx-3">
                    <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                    Joined on{" "}
                    {new Date(user?.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}

                {user?.email && (
                  <span className="mx-3">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    {user?.email}
                  </span>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center w-100">
        <div className="profile-page__content d-flex p-0 gap-3">
          <Col className="col-4">
            <Card className="summary-card">
              <Card.Body className="p-4">
                <Card.Text>
                  <FontAwesomeIcon icon={faNewspaper} className="me-3" />
                  {user?.posts_count} posts published
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faComment} className="me-3" />
                  {user?.comments_count} comments written
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faTag} className="me-3" />0 categories
                  following
                </Card.Text>
              </Card.Body>
            </Card>

            {user?.comments && user?.comments.length > 0 && (
              <Card className="comments-card mt-3">
                <Card.Body className="p-4">
                  <Card.Title className="fw-semibold mb-4">
                    Latest Comments
                  </Card.Title>
                  <Card.Text>
                    {comments?.map((comment, index) => (
                      <div key={index} className="comment border-bottom pb-3">
                        <h6 className="mb-1">{comment?.post_title}</h6>
                        <Row className="justify-content-start align-items-center">
                          <span
                            className="d-inline-block me-2 comment_content"
                            dangerouslySetInnerHTML={{
                              __html: comment?.content,
                            }}
                          ></span>
                          <span className="fw-semibold comment_time">
                            {new Date(comment?.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </Row>
                      </div>
                    ))}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col className="col-5 flex-grow-1">
            {user?.posts && user?.posts.length > 0 ? (
              data?.posts.map((blog, index) => (
                <BlogCard key={index} hide data={blog} />
              ))
            ) : (
              <div className="text-center">
                <p className="fw-semibold mb-3">You don't have any posts yet. Create now!</p>
                <Button variant="primary" className="fw-semibold">Create Post</Button>
              </div>
            )}
            {user?.posts && user?.posts.length > 0 && (
              <Pagination className="justify-content-center">
                {paramsPost.page === 1 ? null : (
                  <Pagination.Prev
                    onClick={() => {
                      if (paramsPost.page > 1) {
                        setParamsPost({
                          ...paramsPost,
                          page: paramsPost.page - 1,
                        });
                      }
                    }}
                  />
                )}
                {paginationItems.map((item, index) =>
                  item === "..." ? (
                    <Pagination.Ellipsis key={index} />
                  ) : (
                    <Pagination.Item
                      key={index}
                      active={item === paramsPost.page}
                      onClick={() => {
                        setParamsPost({ ...paramsPost, page: item });
                        window.scrollTo(0, 0);
                      }}
                    >
                      {item}
                    </Pagination.Item>
                  )
                )}
                <Pagination.Next
                  onClick={() => {
                    if (paramsPost.page < totalPages) {
                      setParamsPost({
                        ...paramsPost,
                        page: paramsPost.page + 1,
                      });
                    }
                  }}
                />

                <Form.Select
                  className="ms-2"
                  value={paramsPost.page}
                  onChange={(e) =>
                    setParamsPost({
                      ...paramsPost,
                      page: parseInt(e.target.value),
                    })
                  }
                  style={{ width: "auto", display: "inline-block" }}
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Page {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Pagination>
            )}
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default ProfilePage;
