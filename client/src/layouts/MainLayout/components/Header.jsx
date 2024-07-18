import React, { useContext, useEffect,useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Dropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBell as faBellSolid } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useQueryClient } from 'react-query';
import { getCurrentUserQuery, useLogoutUser } from 'hooks/user';
import { AuthContext } from 'contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mutate, data, isLoading } = useLogoutUser(
    () => {
      queryClient.invalidateQueries('user-info');
      setUser(null);
      navigate('/', { replace: true });
    }
  );

  const handleLogout = () => {
    mutate()
  }

  return (
    <header className="main-layout__header">
      <Navbar>
        <Navbar.Brand>
          <Link to="/">
            <img className="main-layout__header-logo" src={logo} alt="DEV" />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">{/* {Search bar} */}</Nav>

        {user ? (
          <Nav>
            <Row className="flex-row">
              <Col className="d-flex align-items-center">
                <Link to="/create-post" className="me-2">
                  <Button
                    variant="outline-primary"
                    className="main-layout__header-btn fw-semibold"
                  >
                    Create Post
                  </Button>
                </Link>

                <Link to="/notifications" className="ms-2 me-2">
                  <FontAwesomeIcon
                    icon={faBell}
                    className="main-layout__header-noti"
                  />
                </Link>

                <div className="main-layout__header-user p-1">
                  <Dropdown>
                    <Dropdown.Toggle>
                      <img
                        src={user?.profile_image_url}
                        alt="User"
                        className="main-layout__header-user-img"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end" className="mt-2 p-2">
                      <Dropdown.Item>
                        <Link to="/profile">
                          <p className="fw-semibold">{user?.full_name}</p>
                          <p className="user-name">@{user?.user_name}</p>
                        </Link>
                      </Dropdown.Item>
                      <hr />
                      <Dropdown.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link to="/create-post">Create post</Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link to="/reading-list">Reading list</Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link to="/settings">Settings</Link>
                      </Dropdown.Item>

                      <hr />

                      <Dropdown.Item onClick={handleLogout}>
                        <Link to="/">Sign out</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Nav>
        ) : (
          <Nav>
            <Link to="/signin" className="me-2">
              <Button
                variant="outline-primary"
                className="main-layout__header-btn sign-in"
              >
                Sign in
              </Button>
            </Link>

            <Link to="/register" className="ms-2">
              <Button variant="primary" className="main-layout__header-btn">
                Create account
              </Button>
            </Link>
          </Nav>
        )}
      </Navbar>
    </header>
  );
};

export default Header;
