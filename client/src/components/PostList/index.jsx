import React from 'react';
import { ListGroup } from 'react-bootstrap';

const posts = [
  // Đây là các bài viết mẫu,
  { title: 'Software Comparison 1', link: '#' },
  { title: 'Software Comparison 2', link: '#' },
  // Thêm nhiều bài viết hơn
];

function PostList() {
  return (
    <ListGroup>
      {posts.map((post, index) => (
        <ListGroup.Item key={index} action href={post.link}>
          {post.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default PostList;
