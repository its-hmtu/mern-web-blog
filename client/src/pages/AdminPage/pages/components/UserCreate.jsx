import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Breadcrumb,
  Container,
  Spinner,
  Button,
  Form,
  Pagination,
  Modal,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { useRegisterUserAdmin } from "hooks/user";


const UserCreate = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const handleUserInfoChange = (e) => {
    const newInfo = { ...userInfo };
    newInfo[e.target.id] = e.target.value;

    if (e.target.type === "checkbox") {
      // change the value to boolean
      if (e.target.checked) {
        newInfo[e.target.id] = true;
      } else {
        newInfo[e.target.id] = false;
      }

    }


    setUserInfo(newInfo);
  };

  const {mutate, isLoading} = useRegisterUserAdmin(
    (data) => {
      navigate("/admin/dashboard/users");
    }
  )

  const handleSubmit = () => {
    if (Object.keys(userInfo).length === 0) {
      return;
    }

    mutate(userInfo);
  }

  useEffect(() => {
    console.log(userInfo);
  })

  return (
    <Container className="dashboard-container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/users">Users</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Create
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="m-0">Create</h1>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Container
          fluid
          className="p-4 mt-3 border show-container"
          style={{
            border: "1px solid #dee2e6",
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
          }}
        >
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                id="full_name"
                type="text"
                onChange={handleUserInfoChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User name</Form.Label>
              <Form.Control
                id="user_name"
                type="text"
                onChange={handleUserInfoChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control id="email" type="text" 
                onChange={handleUserInfoChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control id="password" type="password" 
                onChange={handleUserInfoChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select 
                id="role" 
                onChange={handleUserInfoChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="moderator">Moderator</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Is email verified</Form.Label>
              <Form.Check
                id="is_email_verified"
                type="checkbox"
                onChange={handleUserInfoChange}
              ></Form.Check>
            </Form.Group>
          </Form>
          <div className="d-flex mb-3 justify-content-center gap-3">
            <Button
              variant="primary"
              onClick={handleSubmit}
            >
              {
                isLoading ? <Spinner animation="border" /> : "Create"
              }
            </Button>
          </div>
        </Container>
      )}
    </Container>
  );
};

export default UserCreate;
