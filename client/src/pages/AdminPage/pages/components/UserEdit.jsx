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
import { getUserQuery } from "hooks/user";
import { getUserCommentsQuery, getUserPostsQuery } from "hooks/post";
import { getPaginationItems } from "utils/getPaginationItems";
import { getAllUsersQuery } from "hooks/user";
import { useDeleteUserAdmin } from "hooks/admin";

const UserEdit = () => {
  // const navigate = useNavigate();
  // const [paramsPost, setParamsPost] = useState({
  //   page: 1,
  //   limit: 10,
  //   order: "desc",
  // });
  const [postsData, setPostsData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useQuery(getUserQuery(id));
  // const { data: posts, isLoading: isPostLoading } = useQuery(
  //   getUserPostsQuery(id, paramsPost.page, paramsPost.limit, paramsPost.order),
  //   {
  //     keepPreviousData: true,
  //   }
  // );
  // const { data: comments, isLoading: isCommentLoading } = useQuery(
  //   getUserCommentsQuery(
  //     id,
  //     paramsPost.page,
  //     paramsPost.limit,
  //     paramsPost.order
  //   ),
  //   {
  //     keepPreviousData: true,
  //   }
  // );
  const { mutate, isLoading: isDeleteLoading } = useDeleteUserAdmin(() => {
    setIsShow(false);
  });

  const handleDeleteUsers = () => {
    const ids = id;
    console.log(ids);
    mutate(ids);
  };

  // const totalPages = Math.ceil(posts?.totalPosts / paramsPost.limit);
  // useEffect(() => {
  //   if (posts) {
  //     setPostsData(posts);
  //   }
  // }, [posts]);

  useEffect(() => {
    if (data?.comments) {
      setCommentsData(data?.comments);
    }
  }, [data?.comments]);

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <Container className="dashboard-container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {data?.user.role !== "user" ? (
            <Link to="/admin/dashboard/admin-users">Admin users</Link>
          ) : (
            <Link to="/admin/dashboard/users">Users</Link>
          )}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {data?.user.role !== "user" ? (
            <Link to={`/admin/dashboard/admin-users/${id}`}>{id}</Link>
          ) : (
            <Link to={`/admin/dashboard/users/${id}`}>{id}</Link>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="m-0">Edit</h1>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Container
          fluid
          className="p-4 border show-container"
          style={{
            border: "1px solid #dee2e6",
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
          }}
        >
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Id</Form.Label>
              <Form.Control id="id" type="text" value={data?.user._id} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                id="full_name"
                type="text"
                value={data?.user.full_name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User name</Form.Label>
              <Form.Control
                id="user_name"
                type="text"
                value={data?.user.user_name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control id="email" type="text" value={data?.user.email} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select defaultValue={data?.user.role}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="moderator">Moderator</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile image</Form.Label>
              <Form.Control
                id="profile_image_url"
                type="text"
                value={data?.user.profile_image_url}
              />
              <Form.Control
                id="profile_image_url"
                type="file"
                accept="image/*"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control id="bio" type="text" value={data?.user.bio} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                id="location"
                type="text"
                value={data?.user.location}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control id="slug" type="text" value={data?.user.slug} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Is email verified</Form.Label>
              <Form.Check
                id="is_email_verified"
                checked={data?.user.is_email_verified ? true : false}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Is Comment Blocked</Form.Label>
              <Form.Check
                id="is_comment_blocked"
                checked={data?.user.is_comment_blocked ? true : false}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Is Banned</Form.Label>
              <Form.Check
                id="is_banned"
                checked={data?.user.is_banned ? true : false}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Is Create Post Blocked</Form.Label>
              <Form.Check
                id="is_create_post_blocked"
                checked={data?.user.is_create_post_blocked ? true : false}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Created at</Form.Label>
              <Form.Control
                id="created_at"
                type="text"
                value={new Date(data?.user.createdAt).toLocaleString()}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Updated at</Form.Label>
              <Form.Control
                id="updated_at"
                type="text"
                value={new Date(data?.user.updatedAt).toLocaleString()}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Posts</Form.Label>
              <ul className="p-4 border overflow-hidden">
                {data?.posts.map((post, index) => (
                  <li
                    key={post._id}
                    className="mb-3 d-flex justify-content-between border-bottom p-2"
                  >
                    <div>
                      <span className="me-3">{index + 1}</span>
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </div>

                    <Button variant="outline-danger" className="ms-3">
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <ul className="p-4 border overflow-hidden">
                {data?.comments.map((post, index) => (
                  <li
                    key={post._id}
                    className="mb-3 d-flex justify-content-between border-bottom p-2"
                  >
                    <div>
                      <span className="me-3">{index + 1}</span>
                      <Link to={`/post/${post.slug}`}>{post._id}</Link>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="ms-3"
                      style={{
                        height: "fit-content",
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Posts Count</Form.Label>
              <Form.Control
                id="posts_count"
                type="text"
                value={data?.user.posts_count}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comments Count</Form.Label>
              <Form.Control
                id="comments_count"
                type="text"
                value={data?.user.comments_count}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Followers Count</Form.Label>
              <Form.Control
                id="followers_count"
                type="text"
                value={data?.user.followers_count}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Following Categories</Form.Label>
              <ul className="p-4 border overflow-hidden">
                {data?.categories.map((post, index) => (
                  <li
                    key={post._id}
                    className="mb-3 d-flex justify-content-between border-bottom p-2"
                  >
                    <div>
                      <span className="me-3">{index + 1}</span>
                      <Link to={`/post/${post.slug}`}>{post.name}</Link>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="ms-3"
                      style={{
                        height: "fit-content",
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Liked Posts</Form.Label>
              <ul className="p-4 border overflow-hidden">
                {data?.liked_posts.map((post, index) => (
                  <li
                    key={post._id}
                    className="mb-3 d-flex justify-content-between border-bottom p-2"
                  >
                    <div>
                      <span className="me-3">{index + 1}</span>
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="ms-3"
                      style={{
                        height: "fit-content",
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reading List</Form.Label>
              <ul className="p-4 border overflow-hidden">
                {data?.user.reading_list.map((post, index) => (
                  <li
                    key={post._id}
                    className="mb-3 d-flex justify-content-between border-bottom p-2"
                  >
                    <div>
                      <span className="me-3">{index + 1}</span>
                      <Link to={`/post/${post.slug}`}>{post._id}</Link>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="ms-3"
                      style={{
                        height: "fit-content",
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Blocked Users</Form.Label>
              <ul className="p-4 border overflow-hidden">
                {data?.user.blocked_users.map((post, index) => (
                  <li
                    key={post._id}
                    className="mb-3 d-flex justify-content-between border-bottom p-2"
                  >
                    <div>
                      <span className="me-3">{index + 1}</span>
                      <Link to={`/post/${post.slug}`}>{post._id}</Link>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="ms-3"
                      style={{
                        height: "fit-content",
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>
          </Form>
          <div className="d-flex mb-3 justify-content-center gap-3">
            <Button
              variant="primary"
              onClick={
                () => {}
                // navigate("/admin/dashboard/users/:id/edit".replace(":id", id))
              }
            >
              Save
            </Button>

            {data?.user.role !== "admin" && (
              <Button variant="outline-danger" onClick={handleShow}>
                Delete
              </Button>
            )}
          </div>
        </Container>
      )}

      {
        <Modal show={isShow} className="mt-5">
          <Modal.Body>
            <p>Are you sure you want to delete the selected users?</p>

            <Button
              variant="danger"
              onClick={handleDeleteUsers}
              className="me-3"
            >
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Delete"
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setIsShow(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      }
    </Container>
  );
};

export default UserEdit;
