import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getPostsQuery } from "hooks/post";
import { AuthContext } from "contexts/AuthContext";

const SideBarPost = () => {
  const {user} = useContext(AuthContext);

  const [paramsPost, setParamsPost] = useState({
    page: 1,
    limit: 10,
    order: "desc",
    category: "Discussion",
    postIds: "",
  });
  const { data, isLoading } = useQuery(
    getPostsQuery(
      paramsPost.page,
      paramsPost.limit,
      paramsPost.order,
      paramsPost.category,
      paramsPost.postIds,
      paramsPost.currentUserId
    )
  );

  // if user is logged in, add current user id to the params
  useEffect(() => {
    if (user) {
      setParamsPost({ ...paramsPost, currentUserId: user._id });
    }
  }, [user]);

  return (
    <Container className="side-bar-post">
      <Row className="gap-0 p-0">
        <Col className="w-100">
          <h5>Active discussions</h5>
          <ul>
            {data?.posts.map((item, index) => (
              <li key={index}>
                <Link to={`/post/${item.slug}`}>
                  <h6 className="side-bar-post__title">{item?.title}</h6>
                  <p className="side-bar-post__comment m-0">
                    {item?.comments_count} comments
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBarPost;
