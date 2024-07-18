import React, { useEffect, useState } from "react";
import { Container, Row, Tabs, Tab, Pagination, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogCard from "components/BlogCard";
import { getPostsQuery } from "hooks/post";
import { useQuery } from "react-query";
import { getPaginationItems } from "utils/getPaginationItems";

const BlogContent = ({data, paramsPost, handleSelect, setParamsPost}) => {
  
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log(data);

    setBlogs(data?.posts.filter((post) => post.category_name !== "Discussion"));
  }, [data]);

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
          {blogs?.map((blog) => (
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
          {blogs?.map((blog) => (
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
              onClick={() => {
                setParamsPost({ ...paramsPost, page: item })
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
              onClick={() => {
                setParamsPost({ ...paramsPost, page: item })
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
