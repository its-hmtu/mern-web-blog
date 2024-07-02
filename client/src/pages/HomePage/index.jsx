import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SideBarNavigate from './components/SideBarNavigate'
import SideBarPost from './components/SideBarPost'
import BlogContent from './components/BlogContent'
// import BlogContent from 'components/BlogContent'

const HomePage = () => {
  return (
    <>
      <Container fluid className='home-page__container'>
        <Row>
          <Col className='col-left col-1 flex-grow-1 me-2'>
            <SideBarNavigate />
          </Col>

          <Col className='col-center col-7 p-0'>
            <BlogContent />
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