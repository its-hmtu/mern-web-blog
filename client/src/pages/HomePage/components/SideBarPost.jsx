import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SideBarPost = () => {
  const [discussion, setDisscussion] = React.useState([{
    slug: 'post-1',
    title: 'Meme monday',
    comments_count: 10
  }, {
    slug: 'post-1',
    title: 'Meme monday',
    comments_count: 10
  }])

  const [topCategories, setTopCategories] = React.useState({
    tag: '#disussion'
  })

  return (
    <Container className='side-bar-post'>
      <Row className='gap-0 p-0'>
        <Col className='w-100'>
        <h5>Active discussions</h5>
        <ul>
          {
            discussion?.map((item, index) => (
              <li key={index}>
                <Link to={`/post/${item.slug}`}>
                  <p className='side-bar-post__title'>{item?.title}</p>
                  <p className='side-bar-post__comment'>{item?.comments_count} comments</p>
                </Link>
              </li>
            ))
          }
        </ul>
        </Col>
      </Row>

      <Row className='gap-0 p-0'>
        <Col className='w-100'>
        <h5>
          {topCategories?.tag}
          <p>Disussion threads targeting the whole community</p>
        </h5>
        
        <ul>
          {
            discussion?.map((item, index) => (
              <li key={index}>
                <Link to={`/post/${item.slug}`}>
                  <p className='side-bar-post__title'>{item?.title}</p>
                  <p className='side-bar-post__comment'>{item?.comments_count} comments</p>
                </Link>
              </li>
            ))
          }
        </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default SideBarPost