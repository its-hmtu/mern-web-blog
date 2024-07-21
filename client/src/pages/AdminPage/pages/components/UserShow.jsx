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

const UserShow = () => {
  const navigate = useNavigate();
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

  const handleDelete = (id) => {
    
  }

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
  }
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
      <h1 className="m-0">Show</h1>
      <div className="d-flex mb-3 justify-content-end gap-3">
        <Button
          variant="outline-primary"
          onClick={() =>
            navigate("/admin/dashboard/users/:id/edit".replace(":id", id))
          }
        >
          Edit
        </Button>

        {data?.user.role !== "admin" && <Button variant="outline-danger" onClick={handleShow}>
          Delete
        </Button>}
      </div>
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
          <img
            src={data?.user.profile_image_url}
            alt=""
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "inline",
              marginBottom: "10px",
            }}
          />
          <div className="p-2">
            <h6>Id</h6>
            <p>{data?.user._id}</p>
            <h6>Email</h6>
            <p>{data?.user.email}</p>
            <h6>Full name</h6>
            <p>{data?.user.full_name}</p>
            <h6>User name</h6>
            <p>{data?.user.user_name}</p>
            <h6>Role</h6>
            <Badge className="mb-3" pill>
              {data?.user.role}
            </Badge>
            <h6>Is email verified</h6>
            <Badge className="mb-3" pill>
              {data?.user.is_email_verified ? "Yes" : "No"}
            </Badge>
            <h6 className="d-block">Profile Image URL</h6>
            <p>{data?.user.profile_image_url}</p>
            <h6>Bio</h6>
            <p>{data?.user.bio}</p>
            <h6>Location</h6>
            <p>{data?.user.location}</p>
            <h6>Slug (Path)</h6>
            <p>/{data?.user.slug}</p>
            <h6>Posts</h6>

            <div className="border p-3 mb-3">
              {data?.posts.map((post, index) => (
                <div key={post._id} className="border-bottom">
                  <span>{index + 1}. </span>
                  <Link to={`/admin/dashboard/posts/${post._id}`}>
                    {post.title}
                  </Link>
                </div>
              ))}
              {/* <Form.Select
                className="ms-2"
                value={paramsPost.page}
                onChange={(e) =>
                  setParamsPost({
                    ...paramsPost,
                    page: parseInt(e.target.value),
                  })
                }
                style={{ width: "auto", display: "inline-block" }}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Page {i + 1}
                  </option>
                ))}
              </Form.Select> */}
            </div>
            <h6>Posts count</h6>
            <Badge>{data?.posts?.totalPosts}</Badge>

            <h6 className="mt-3">Comments</h6>
            <div className="border p-3 mb-3">
              {commentsData?.map((comment, index) => (
                <div key={comment._id} className="border-bottom">
                  <Link
                    to={`/admin/dashboard/comments/${comment._id}`}
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  ></Link>
                </div>
              ))}
            </div>

            <h6>Comments count</h6>
            <Badge>{commentsData?.length}</Badge>

            <h6 className="mt-3">Following</h6>
            <div className="border p-3 mb-3">
              {data?.user.following.map((following, index) => (
                <div key={following._id} className="border-bottom">
                  <span>{index + 1}. </span>
                  <Link to={`/admin/dashboard/comments/${following._id}`}>
                    {following._id}
                  </Link>
                </div>
              ))}
            </div>
            <h6 className="mt-3">Followers count</h6>
            <Badge>{data?.followers_count}</Badge>

            <h6 className="mt-3">Following Categories</h6>
            <div className="border p-3 mb-3">
              {data?.user.following.map((following, index) => (
                <div key={following._id} className="border-bottom">
                  <span>{index + 1}. </span>
                  <Link to={`/admin/dashboard/comments/${following._id}`}>
                    {following._id}
                  </Link>
                </div>
              ))}
            </div>

            <h6 className="mt-3">Liked Posts</h6>
            <div className="border p-3 mb-3">
              {data?.user.liked_post.map((following, index) => (
                <div key={following._id} className="border-bottom">
                  <span>{index + 1}. </span>
                  <Link to={`/admin/dashboard/posts/${following._id}`}>
                    {following._id}
                  </Link>
                </div>
              ))}
            </div>

            <h6 className="mt-3">Reading list</h6>
            <div className="border p-3 mb-3">
              {data?.user.reading_list.map((following, index) => (
                <div key={following._id} className="border-bottom">
                  <span>{index + 1}. </span>
                  <Link to={`/admin/dashboard/comments/${following._id}`}>
                    {following._id}
                  </Link>
                </div>
              ))}
            </div>

            <h6 className="mt-3">Blocked users</h6>
            <div className="border p-3 mb-3">
              {data?.user.blocked_users.map((following, index) => (
                <div key={following._id} className="border-bottom">
                  <span>{index + 1}. </span>
                  <Link to={`/admin/dashboard/comments/${following._id}`}>
                    {following._id}
                  </Link>
                </div>
              ))}
            </div>

            <h6>Is comment blocked</h6>
            <Badge className="mb-3" pill>
              {data?.user.is_comment_blocked ? "Yes" : "No"}
            </Badge>

            <h6>Is banned</h6>
            <Badge className="mb-3" pill>
              {data?.user.banned ? "Yes" : "No"}
            </Badge>

            <h6>Is create post blocked</h6>
            <Badge className="mb-3" pill>
              {data?.user.is_create_post_blocked ? "Yes" : "No"}
            </Badge>

            <h6>Created At</h6>
            <p>{new Date(data?.user.createdAt).toUTCString()}</p>

            <h6>Updated At</h6>
            <p>{new Date(data?.user.updatedAt).toUTCString()}</p>
          </div>
        </Container>
      )}

    {<Modal show={isShow} className="mt-5">
      <Modal.Body>
        <p>Are you sure you want to delete the selected users?</p>

        <Button variant="danger" onClick={handleDeleteUsers} className="me-3">
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
    </Modal>}
    </Container>
  );
};

export default UserShow;
