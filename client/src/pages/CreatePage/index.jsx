import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row, Tabs, Tab, Button, Tooltip, Form, } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getCategoriesQuery, useCreatePost } from "hooks/post";

const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [content, setContent] = useState("");
  const formData = new FormData();
  const fileInputRef = useRef(null);
  const {data: categories, isLoading: isCategoriesLoading} = useQuery(getCategoriesQuery());
  const {mutate, isLoading: isCreatingPost} = useCreatePost(

  );

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

  // Handle the value of the editor
  const handleChange = (value) => {
    console.log(value)
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("title", title);
    formData.append("category_name", categoryName);
    formData.append("content", content);

    // get the cover image file that was uploaded from local machine
    // const coverImage = document.querySelector("#cover-image").files[0];
    formData.append("main_image", selectedImage);

    // get content images from react-quill editor and append to formData
    const contentImages = document.querySelectorAll(".ql-editor img");

    for (const image of contentImages) {
      const imageUrl = image.getAttribute("src");
      if (imageUrl.startsWith('data:image')) { // Check if the URL is a base64 encoded image
        // Convert base64/URLEncoded data component to a Blob
        const fetchResponse = await fetch(imageUrl);
        const imageBlob = await fetchResponse.blob();
        formData.append("content_images", imageBlob); // Assuming a generic name, ideally use a unique name
      }
    }

   
    mutate(formData);
  }
  
  const handleCloseEditor = () => {
    navigate("/" , { replace: true })
  }

  // calculate the height of the title textarea
  useEffect(() => {
    const titleTextArea = document.querySelector(".create-page__title");
    titleTextArea.style.height = "auto";
    titleTextArea.style.height = titleTextArea.scrollHeight + "px";
  }, [title]);

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
              <Form >
                <Form.Group controlId="cover-image" className="mb-3">
                  <Form.Label>Cover Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} ref={fileInputRef}/>
                  {selectedImage && (
              <div>
                {/* <Button variant="primary" className="mt-2" onClick={() => document.getElementById('cover-image').click()}>
                  Change
                </Button> */}
                <Button variant="danger" className="mt-2 ms-2" onClick={removeSelectedImage}>
                  Remove
                </Button>
              </div>
            )}
                </Form.Group>
                <Form.Group controlId="title" className="mb-3">
                  <Form.Control
                    as="textarea"
                    className="create-page__title"
                    type="text"
                    placeholder="Your title goes here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      minHeight: "",
                      maxHeight: "",
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="category" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select 
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                  >
                    <option>Select category</option>
                    {categories?.map((category) => (
                      <option key={category._id}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="content" className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={
                      handleChange
                    }
                    modules={modules}
                    formats={formats}
                    placeholder="Write something amazing..."
                  />
                </Form.Group>
              </Form>
            </Col>

            <Button
              variant="primary"
              className="create-page__publish-btn fw-semibold mt-3"
              onClick={handleSubmit}
            >
              Publish
            </Button>
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <Col>
              {
                // Post details preview 
              }
            </Col>
          </Tab>
        </Tabs>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default CreatePage;
