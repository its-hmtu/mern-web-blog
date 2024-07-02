import React from "react";
import { Col, Container, Row, Tabs, Tab, Button, Tooltip } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CreatePage = () => {
  // const [value, setValue] = React.useState('Write your post content here...')
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      { header: [1, 2, 3, false] },
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      { list: "ordered" },
      { list: "bullet" },
      "link",
      "image",
      "clean",
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleUploadImage = () => {
    // handle upload image browse from local
    // then display the image in the left side of the add a cover image butto

  };
  
  const handleCloseEditor = () => {
    navigate("/" , { replace: true })
    
  }

  return (
    <Container fluid className="create-page__container ">
      <header className="d-flex justify-content-between">
        <h4>Create post</h4>
        <Button className="" onClick={handleCloseEditor}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </header>
      <Row className="mt-4">
        <Tabs
          defaultActiveKey="edit"
          id="uncontrolled-tab-example"
          className="mb-2 border-0 px-2"
        >
          <Tab eventKey="edit" title="Edit" className="p-0">
            <Col className="create-page__editor-col">
              <input
                type="file"
                className="create-page__cover-image"
                onChange={handleUploadImage}
              />
              <input
                type="text"
                placeholder="New post title here..."
                className="create-page__title p-2 fs-2 w-100"
              />
              <input
                type="text"
                placeholder="Up to 4 categories"
                className="create-page__categories p-2 w-100"
              />
              <ReactQuill
                theme="snow"
                placeholder="Write your post content here..."
                modules={modules}
                formats={formats}
              />
            </Col>

            <Button
              variant="primary"
              className="create-page__publish-btn fw-semibold mt-3"
            >
              Publish
            </Button>
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <Col>
              <h1>Title</h1>
            </Col>
          </Tab>
        </Tabs>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default CreatePage;
