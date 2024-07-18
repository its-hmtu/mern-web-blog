import React, {useEffect, useState} from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import SideBarNavigate from './components/SideBarNavigate'
import SideBarPost from './components/SideBarPost'
import BlogContent from './components/BlogContent'
// import BlogContent from 'components/BlogContent'
import { useQuery } from 'react-query'
import { getPostsQuery } from 'hooks/post'
import { refreshToken } from 'api/user'

const HomePage = () => {
  const [paramsPost, setParamsPost] = useState({
    page: 1,
    limit: 10,
    order: "desc",
    category: "",
  });
  const { data, isLoading } = useQuery(
    getPostsQuery(paramsPost.page, paramsPost.limit, paramsPost.order, paramsPost.category),
    {
      keepPreviousData: true,
    }
  );

  const handleParamsPostChange = (newParams) => {
    setParamsPost(newParams);
  }

  const handleSelect = (key) => {
    // Assuming 'latest' tab should show posts in descending order
    const newOrder = key === "latest" ? "desc" : "asc";
    setParamsPost({ ...paramsPost, order: newOrder });
  };

  return (
    <>
      <Container fluid className='home-page__container'>
        <Row>
          <Col className='col-left col-1 flex-grow-1 me-2'>
            <SideBarNavigate />
          </Col>

          <Col className='col-center col-7 p-0'>
            <BlogContent data={data} paramsPost={paramsPost} handleSelect={handleSelect} setParamsPost={handleParamsPostChange}/>
          </Col>

          <Col className='col-right col-2 flex-grow-1'>
            <SideBarPost />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage