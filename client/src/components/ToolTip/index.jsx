import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const ToolTip = ({id, title, children}) => {
  return (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  )
}

export default ToolTip