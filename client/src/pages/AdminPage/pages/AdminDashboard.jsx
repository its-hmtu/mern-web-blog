import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Offcanvas, Row, Col, Card, Badge } from "react-bootstrap";
import { useQuery } from "react-query";
import { getPostsQuery } from "hooks/post";
import { getAllUsersQuery } from "hooks/user";
import BlogCard from "components/BlogCard";

const AdminDashboard = () => {
  const [paramsPost, setParamsPost] = useState({
    page: 1,
    limit: 3,
    order: "desc",
  });
  const [paramsUsers, setParamsUsers] = useState({
    page: 1,
    limit: 5,
    order: "desc",
  });
  const [usersData, setUsersData] = useState(null);
  const { data: posts, isLoading: isPostLoading } = useQuery(
    getPostsQuery(paramsPost.page, paramsPost.limit, paramsPost.order),
    {
      keepPreviousData: true,
    }
  );

  const { data: users, isLoading: isUserLoading } = useQuery(
    getAllUsersQuery(paramsUsers.page, paramsUsers.limit, paramsUsers.order)
  );

  useEffect(() => {
    setUsersData(users?.data);
  }, [users]);

  return (
    <Container fluid className="dashboard-container">
      <Row className="flex-nowrap gap-2">
        <Col
          className="col-4 p-4"
          style={{
            border: "1px solid #dee2e6",
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
            maxHeight: "50dvh",
          }}
        >
          <h5 className="fw-bold mb-3">New Users</h5>
          {isUserLoading ? (
            <p>Loading...</p>
          ) : (
            usersData
              ?.filter((user) => user.role === "user")
              .map((user) => (
                <Card
                  key={user._id}
                  className="mb-2"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <Card.Body className="position-relative">
                    <Card.Text className="mb-1">
                      <Row className="gap-2 px-2 flex-nowrap">
                        <img
                          src={user.profile_image_url}
                          alt=""
                          className="p-0"
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                          }}
                        />
                        <span className="fw-semibold">
                          {user.full_name} @{user.user_name}
                        </span>
                      </Row>
                    </Card.Text>
                    <Badge
                      className="position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                  </Card.Body>
                </Card>
              ))
          )}
        </Col>
        <Col className="col-3">
          <Row
            className="mb-3"
            style={{
              border: "1px solid #dee2e6",
              boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
            }}
          >
            <Col className="p-3">
              <h5 className="fw-bold mb-3">Total Users</h5>
              {isPostLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <h1 className="fw-semibold d-flex align-items-center">
                    {users?.totalUsers}
                  </h1>
                </>
              )}
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid #dee2e6",
              boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
            }}
          >
            <Col className="p-3">
              <h5 className="fw-bold mb-3">Total Posts</h5>
              {isPostLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <h1 className="fw-semibold d-flex align-items-center">
                    {posts?.totalPosts}
                    <span
                      className="mx-2"
                      style={{
                        color:
                          posts?.totalPosts - posts?.lastMonthPosts > 0
                            ? "green"
                            : "red",
                        fontSize: "16px",
                      }}
                    >
                      {posts?.totalPosts - posts?.lastMonthPosts > 0
                        ? "+"
                        : "-"}
                      {posts?.totalPosts - (posts?.lastMonthPosts % 100)}%
                    </span>
                  </h1>
                  <h5 className="fw-bold my-3">Last Month Posts</h5>
                  <h1 className="fw-semibold d-flex align-items-center">
                    {posts?.lastMonthPosts}
                  </h1>
                </>
              )}
            </Col>
          </Row>
        </Col>

        <Col
          className="col-5 p-4"
          style={{
            border: "1px solid #dee2e6",
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
          }}
        >
          <h5 className="fw-bold mb-3">Latest Posts</h5>
          {isPostLoading ? (
            <p>Loading...</p>
          ) : (
            posts?.posts.map((post) => (
              <BlogCard key={post._id} data={post} hide/>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
