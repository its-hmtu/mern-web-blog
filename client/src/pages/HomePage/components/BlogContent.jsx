import React from 'react';
import { Container, Row, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogCard from 'src/components/BlogCard';

const BlogContent = () => {
  const [blogs, setBlogs] = React.useState([]);

  return (
    <Container className="p-0">
      <Tabs
        defaultActiveKey="all"
        id="blog-content__tabs"
        className="mb-3 blog-content__tabs"
      >
        <Tabs.Item
          eventKey="all"
          title="Relevant"
          className="blog-content__tab"
        >
          {blogs.map((blog) => (
            <Link
              to={'/post/:slug'.replace(':slug', blog.slug)}
              key={blog.id}
              className="text-decoration-none"
            >
              <BlogCard data={blog} />
            </Link>
          ))}
        </Tabs.Item>
        <Tabs.Item
          eventKey="latest"
          title="Latest"
          className="blog-content__tab"
        />
        <Tabs.Item eventKey="top" title="Top" className="blog-content__tab" />
      </Tabs>
    </Container>
  );
};

export default BlogContent;
