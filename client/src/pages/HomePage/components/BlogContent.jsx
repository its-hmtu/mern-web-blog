import React, { useEffect, useState } from "react";
import { Container, Row, Tabs, Tab, Pagination, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogCard from "components/BlogCard";
import { getPostsQuery } from "hooks/post";
import { useQuery, useQueryClient } from "react-query";
import { getPaginationItems } from "utils/getPaginationItems";

const BlogContent = () => {
  const queryClient = useQueryClient();
  const [paramsPost, setParamsPost] = useState({
    page: 1,
    limit: 5,
    order: "desc",
  });
  const [blogs, setBlogs] = useState([]);
  const { data, isLoading } = useQuery(
    getPostsQuery(paramsPost.page, paramsPost.limit, paramsPost.order),
    {
      keepPreviousData: true,
    }
  );

  const handleSelect = (key) => {
    // Assuming 'latest' tab should show posts in descending order
    const newOrder = key === "latest" ? "desc" : "asc";
    setParamsPost({ ...paramsPost, order: newOrder });
  };

  useEffect(() => {
    console.log(data?.posts);

    setBlogs(data?.posts);
  }, []);

  useEffect(() => {
    console.log(blogs);
  });

  const totalPages = Math.ceil(data?.totalPosts / paramsPost.limit);
  const paginationItems = getPaginationItems(paramsPost.page, totalPages);

  return (
    <Container className="p-0 position-relative">
      <Tabs
        defaultActiveKey="latest"
        id="blog-content__tabs"
        className="mb-3 blog-content__tabs"
        onSelect={handleSelect}
      >
        <Tab eventKey="latest" title="Latest" className="blog-content__tab">
          {data?.posts?.map((blog) => (
            <Link
              to={"/post/:slug".replace(":slug", blog.slug)}
              key={blog.id}
              className="text-decoration-none"
            >
              <BlogCard data={blog} />
            </Link>
          ))}
        </Tab>
        <Tab eventKey="relevant" title="Relevant" className="blog-content__tab">
          {data?.posts?.map((blog) => (
            <Link
              to={"/post/:slug".replace(":slug", blog.slug)}
              key={blog.id}
              className="text-decoration-none"
            >
              <BlogCard data={blog} />
            </Link>
          ))}
        </Tab>
      </Tabs>
      <Pagination
        className="position-absolute"
        style={{
          right: 0,
          top: 0,
        }}
      >
        {paramsPost.page === 1 ? null : (
          <Pagination.Prev
            onClick={() => {
              if (paramsPost.page > 1) {
                setParamsPost({ ...paramsPost, page: paramsPost.page - 1 });
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
              onClick={() => setParamsPost({ ...paramsPost, page: item })}
            >
              {item}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => {
            if (paramsPost.page < totalPages) {
              setParamsPost({ ...paramsPost, page: paramsPost.page + 1 });
            }
          }}
        />
        <Form.Select
          className="ms-2"
          value={paramsPost.page}
          
          onChange={(e) =>
            setParamsPost({ ...paramsPost, page: parseInt(e.target.value) })
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
      <Pagination className="justify-content-center">
        {paramsPost.page === 1 ? null : (
          <Pagination.Prev
            onClick={() => {
              if (paramsPost.page > 1) {
                setParamsPost({ ...paramsPost, page: paramsPost.page - 1 });
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
              onClick={() => setParamsPost({ ...paramsPost, page: item })}
            >
              {item}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => {
            if (paramsPost.page < totalPages) {
              setParamsPost({ ...paramsPost, page: paramsPost.page + 1 });
            }
          }}
        />

        <Form.Select
          className="ms-2"
          value={paramsPost.page}
          
          onChange={(e) =>
            setParamsPost({ ...paramsPost, page: parseInt(e.target.value) })
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
    </Container>
  );
};

export default BlogContent;
