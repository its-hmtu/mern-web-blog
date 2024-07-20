import React from 'react';
import { Box, Button, Label, MessageBox, Text } from '@adminjs/design-system';
import { useNavigate, useRecord, useTranslation } from 'adminjs';

const DeleteComment = (props) => {
  const { record } = props;
  const { translateMessage } = useTranslation();
  const navigate = useNavigate();
  const recordId = record.id;

  const handleDelete = async () => {
    const response = await fetch(`/admin/resources/Comment/actions/deleteComment/${recordId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.notice.type === 'success') {
      navigate('/admin/resources/Comment');
    } else {
      alert(data.notice.message);
    }
  };

  return (
    <Box variant="gray">
      <Label>{translateMessage('Are you sure you want to delete this comment?')}</Label>
      <MessageBox message={record.params.content} variant="info" />
      <Box>
        <Button variant="danger" onClick={handleDelete}>
          {translateMessage('Delete')}
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteComment;