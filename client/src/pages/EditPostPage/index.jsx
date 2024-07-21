import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Col,
  Container,
  Row,
  Tabs,
  Tab,
  Button,
  Tooltip,
  Form,
  Spinner,
  Card,
  Modal,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getCategoriesQuery, getSinglePostQuery, useCreatePost, useUpdatePost } from "hooks/post";
import { uploadFile } from "api/upload";
import { AuthContext } from "contexts/AuthContext";

const EditPostPage = () => {
  const navigate = useNavigate();
  const { path } = useParams();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const formData = new FormData();
  const {data, isLoading: isPostLoading} = useQuery(getSinglePostQuery(path))
  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    getCategoriesQuery()
  );
  const {mutate: updatePost, isLoading: isUpdating} = useUpdatePost(
    (data) => {
      console.log(data);
      // navigate("/dashboard", { replace: true });
    } 
  )
  
  const handleImageChange = async (e) => {
    console.log(e.target.files);
    if (e.target.files.length) {
      setSelectedImage(e.target.files[0]);
    }
    formData.append("image", e.target.files[0]);
    const data = await uploadFile(formData);
    setMainImage(data);
  };

  useEffect(() => {
    setTitle(data?.title);
    setCategoryName(data?.category_name);
    setContent(data?.content);
    setMainImage(data?.main_image);
  }, [data]);

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setMainImage(null);
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

  const handleChange = (value) => {
    console.log(value);
    setContent(value);
  };

  const handleCloseEditor = () => {
    navigate("/dashboard", { replace: true });
  };

  // calculate the height of the title textarea
  useEffect(() => {
    const titleTextArea = document.querySelector(".create-page__title");
    titleTextArea.style.height = "auto";
    titleTextArea.style.height = titleTextArea.scrollHeight + "px";
  }, [title]);

  const handleSubmit = async () => { 
    const post =  {
      title,
      category_name: categoryName,
      content,
      main_image: mainImage,
    }   
    updatePost({id: data?._id, postData: post});

    if (!isUpdating) {
      setShowModal(true);
    }
  };

  return (
    <Container fluid className="create-page__container pb-3">
      <header className="d-flex justify-content-between">
        <h4>Edit post</h4>
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
              <Form>
                <Form.Group controlId="cover-image" className="mb-3">
                  <Form.Label>Cover Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  {selectedImage && (
                    <div>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <img
                          src={URL.createObjectURL(selectedImage) || mainImage}
                          alt=""
                          className="create-page__main-image"
                          style={{
                            maxHeight: "200px",
                            maxWidth: "200px",
                            objectFit: "cover",
                          }}
                        />
                        <Button
                          variant="outline-danger"
                          onClick={removeSelectedImage}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.Group>
                <Form.Group controlId="title" className="mb-3">
                  <Form.Label>Title</Form.Label>
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
                    onChange={(e) => {
                      setCategoryName(e.target.value)
                      console.log(e.target.value)
                    }}
                    value={categoryName}
                  >
                    <option>Select category</option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category.name}>
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
                    onChange={handleChange}
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
              {isUpdating ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Update"
              )}
            </Button>
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <Container
              className="post-view__container position-relative pt-0"
              fluid
            >
              <Row className="gap-2 justify-content-center">
                <Col className="col-12">
                  <Card className="post-view__card">
                    {selectedImage && (
                      <Card.Img
                        variant="top"
                        src={URL.createObjectURL(selectedImage)}
                        className="post-view__main-image"
                        style={{
                          maxHeight: "300px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title className="post-view__title">
                        {title}
                      </Card.Title>
                      <Row className="mt-2">
                        <Card.Text className="post-view__tags">
                          {categoryName ? `${categoryName}` : ""}
                        </Card.Text>
                      </Row>
                      <Row>
                        <Card.Text className="post-view__author">
                          <Row className="align-items-center p-3 ">
                            <img
                              src={user?.profile_image_url}
                              alt=""
                              className="blog-card__user-img p-0"
                              style={{
                                maxWidth: "48px",
                                height: "48px",
                              }}
                            />

                            <Row
                              style={{
                                width: "fit-content",
                              }}
                            >
                              <Link className="fw-semibold">
                                {user?.full_name}
                              </Link>
                              {/* <span className="post-view__date">
                                {new Date.now()}
                              </span> */}
                            </Row>
                          </Row>
                        </Card.Text>
                      </Row>
                      <Card.Text>
                        <article
                          className="fw-medium p-3 post-view__content"
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></article>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </Row>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        className="mt-5"
        centered
      >
        <Modal.Header>
          <Modal.Title>Post Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your post has been successfully updated.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              navigate("/dashboard", { replace: true });
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditPostPage;
