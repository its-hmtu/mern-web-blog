import React, { useEffect, useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Container,
  FormCheck,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllUsersQuery } from "hooks/user";
import { useDeleteUserAdmin } from "hooks/admin";

const AdminUsersTeam = () => {
  const navigate = useNavigate();
  const [paramsUsers, setParamsUsers] = useState({
    page: 1,
    limit: 5,
    order: "desc",
  });

  const { data: users, isLoading: isUserLoading } = useQuery(
    getAllUsersQuery(paramsUsers.page, paramsUsers.limit, paramsUsers.order)
  );
  const {mutate, isLoading} = useDeleteUserAdmin(
    () => {
      setIsShow(false);
    }
  )

  const [checkedUser, setCheckedUser] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [nameSortDir, setNameSortDir] = useState("asc");

  useEffect(() => {
    setUsersData(users?.data);
  }, [users]);

  const handleDeleteUsers = () => {
    if (checkedUser.length === 0) {
      return;
    }

    const ids = checkedUser.join(",");
    console.log(ids);
    mutate(ids);
  }

  return (
    <Container className="dashboard-container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/admin-users">Admins</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1>List ({users?.totalUsers})</h1>

      <div className="d-flex mb-3 justify-content-end">
        <Button
          variant="outline-primary"
          onClick={() => navigate("/admin/dashboard/users/create")}
          
        >
          Create User
        </Button>

        {checkedUser.length > 0 && <Button
          variant="outline-danger"
          onClick={
            () => {
              setIsShow(true);
            } 
          }
          className="ms-3"
        >
          Delete Users
        </Button>}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th
              onClick={() => {
                if (nameSortDir === "asc") {
                  setUsersData(
                    usersData.sort((a, b) =>
                      a.full_name.localeCompare(b.full_name)
                    )
                  );
                  setNameSortDir("desc");
                } else {
                  setUsersData(
                    usersData.sort((a, b) =>
                      b.full_name.localeCompare(a.full_name)
                    )
                  );
                  setNameSortDir("asc");
                }
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Name
            </th>
            <th
              onClick={() => {
                if (nameSortDir === "asc") {
                  setUsersData(
                    usersData.sort((a, b) =>
                      a.user_name.localeCompare(b.user_name)
                    )
                  );
                  setNameSortDir("desc");
                } else {
                  setUsersData(
                    usersData.sort((a, b) =>
                      b.user_name.localeCompare(a.user_name)
                    )
                  );
                  setNameSortDir("asc");
                }
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Username
            </th>
            <th
              onClick={() => {
                if (nameSortDir === "asc") {
                  setUsersData(
                    usersData.sort((a, b) => a.email.localeCompare(b.email))
                  );
                  setNameSortDir("desc");
                } else {
                  setUsersData(
                    usersData.sort((a, b) => b.email.localeCompare(a.email))
                  );
                  setNameSortDir("asc");
                }
              }}
              style={{
                cursor: "pointer",
              }}
            >Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isUserLoading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            usersData
              ?.filter((user) => user.role !== "user")
              .map((user) => (
                <tr key={user._id}
                  style={{
                    cursor: "pointer",
                  }}
                > 
                  <td>
                    <FormCheck type="checkbox" 
                      onChange={
                        (e) => {
                          if (e.target.checked) {
                            setCheckedUser([...checkedUser, user._id]);
                          } else {
                            setCheckedUser(checkedUser.filter((id) => id !== user._id));
                          }
                        }
                      }
                    />
                  </td>
                  <td>{user._id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.user_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg="secondary">{user.role}</Badge>
                  </td>
                  <td>
                    <Link
                      to={`/admin/dashboard/admin-users/:id`.replace(":id", user._id)}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>

      <Modal show={isShow} className="mt-5">
        <Modal.Body>
          <p>
            Are you sure you want to delete the selected users?
          </p>

          <Button variant="danger" onClick={handleDeleteUsers} className="me-3">
            {isLoading ? 
            <Spinner animation="border" role="status" />
            : "Delete"
            }
          </Button>

          <Button variant="secondary" onClick={
            () => {
              setIsShow(false);
            }
          }>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminUsersTeam;
