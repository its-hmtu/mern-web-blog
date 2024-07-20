import React from 'react'

const PostContent = ({ record, property }) => {
  const content = record.params[property.name]
  return (
    `<div style={{ overflowWrap: 'break-word', wordWrap: 'break-word', overflowX: 'auto' }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>`
  )
}

export default PostContent