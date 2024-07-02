import React from 'react'
import { Container, Row, Tabs } from 'react-bootstrap'
import BlogCard from 'src/components/BlogCard'

const BlogContent = () => {
  const [blogs, setBlogs] = React.useState(
    [
      {
        id: 1,
        title: 'Meme Monday',
        full_name: 'Ben Halpern',
        user_image: 'https://media.dev.to/cdn-cgi/image/width=50,height=50,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1%2Ff451a206-11c8-4e3d-8936-143d0a7e65bb.png',
        date: 'Jan 1 (7 hours ago)',
        tags: ['#discuss', '#code'],
        like: 10,
        comment: 2,
        read_time: 2,
        image: 'https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F08vdwnxq29iztqhshcye.png'
      },
      {
        id: 2,
        title: 'Meme Monday',
        full_name: 'Ben Halpern',
        user_image: 'https://media.dev.to/cdn-cgi/image/width=50,height=50,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1%2Ff451a206-11c8-4e3d-8936-143d0a7e65bb.png',
        date: 'Jan 1 (7 hours ago)',
        tags: ['#discuss', '#code'],
        like: 10,
        comment: 2,
        read_time: 3,
        image: 'https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F08vdwnxq29iztqhshcye.png'
      }
    ]
  )

  return (
    <Container className='p-0'>
      <Tabs defaultActiveKey='all' id='blog-content__tabs' className='mb-3 blog-content__tabs'>
        <Tabs.Item eventKey='all' title='Relevant' className="blog-content__tab" >
          {blogs.map(blog => (
            <BlogCard key={blog.id} data={blog} />
          ))}
        </Tabs.Item>
        <Tabs.Item eventKey='latest' title='Latest' className="blog-content__tab"/>
        <Tabs.Item eventKey='top' title='Top' className="blog-content__tab"/>
      </Tabs>
    </Container>
  )
}

export default BlogContent