import React, { useEffect, useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllUsersQuery } from "hooks/user";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [paramsUsers, setParamsUsers] = useState({
    page: 1,
    limit: 5,
    order: "desc",
  });

  const { data: users, isLoading: isUserLoading } = useQuery(
    getAllUsersQuery(paramsUsers.page, paramsUsers.limit, paramsUsers.order)
  );

  const handleShow = (id) => {
    navigate("/admin/dashboard/users/:id".replace(":id", id));
  };

  const [usersData, setUsersData] = useState(null);
  const [nameSortDir, setNameSortDir] = useState("asc");

  useEffect(() => {
    setUsersData(users?.data);
  }, [users]);
  return (
    <Container className="dashboard-container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/users">Users</Link>
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
              ?.filter((user) => user.role === "user")
              .map((user) => (
                <tr key={user._id} onClick={() => handleShow(user._id)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <td>{user._id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.user_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg="secondary">{user.role}</Badge>
                  </td>
                  <td>
                    <Link
                      to={`/admin/dashboard/users/:id`.replace(":id", user._id)}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsers;
