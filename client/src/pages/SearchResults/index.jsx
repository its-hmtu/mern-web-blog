import { getPostsQuery } from "hooks/post";
import SideBarNavigate from "pages/HomePage/components/SideBarNavigate";
import SideBarPost from "pages/HomePage/components/SideBarPost";
import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { getPaginationItems } from "utils/getPaginationItems";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const string = searchParams.get("query");
  const [paramsPost, setParamsPost] = useState({
    page: "",
    limit: "",
    order: "",
  });
  const { data, isLoading } = useQuery(
    getPostsQuery(paramsPost.page, paramsPost.limit, paramsPost.order)
  );
  const [searchResults, setSearchResults] = useState(
    data?.posts?.filter((item) =>
      item.title.toLowerCase().includes(string.toLowerCase())
    )
  );


  return (
    <Container fluid className="home-page__container">
      <Row className="gap-5">
        <Col className="col-left col-2 me-2">
          <SideBarNavigate />
        </Col>

        <Col className="col-center col-8 p-0">
          <div>
            <h1 className="mb-3">Search results for "{string}"</h1>
            {searchResults?.length > 0 ? (
              <ul>
                {searchResults?.map((result, index) => (
                  <Card key={index} className="mb-3 p-3" style={{
                    boxShadow: "0 0 0 1px rgba(23, 23, 23, 0.05)"
                  }}>
                    <div className="d-flex">
                      <img
                        src={result.profile_image_url}
                        alt=""
                        className="profile-image"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <strong className="fw-semibold">
                          @{result.author}
                        </strong>
                        <small
                          style={{
                            display: "block",
                            color: "#333",
                            fontWeight: "500",
                          }}
                        >
                          {new Date(result.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </small>
                      </div>
                    </div>
                    <Link
                      to={`/post/${result.slug}`}
                      className="text-decoration-none my-2 px-4"
                    >
                      <Card.Title className="fw-semibold">
                        {result.title}
                      </Card.Title>
                    </Link>
                    <Badge bg="secondary" className="mx-4" style={{
                      maxWidth: "fit-content"
                    }}>
                      {result.category_name}
                    </Badge>
                  </Card>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
        </Col>

        {/* {<Col className="col-right col-2 flex-grow-1">
        </Col>} */}
      </Row>
    </Container>
  );
};

export default SearchResults;
