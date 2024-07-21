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
import SearchBar from "components/SearchBar/SearchBar";

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
  const { mutate, isLoading } = useDeleteUserAdmin(() => {
    setIsShow(false);
  });

  const [checkedUser, setCheckedUser] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [nameSortDir, setNameSortDir] = useState("asc");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [checkAll, setCheckAll] = useState(false);

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

  useEffect(() => {
    if (searchQuery) {
      const filtered = usersData?.filter(user => 
        user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user._id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(usersData);
    }
  }, [searchQuery, usersData]);

  const handleCheckAll = (e) => {
    const { checked } = e.target;
    setCheckAll(checked);
    if (checked) {
      setCheckedUser(usersData?.map(user => user._id));
    } else {
      setCheckedUser([]);
    }
  };

  const handleCheckUser = (e, userId) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedUser(prev => [...prev, userId]);
    } else {
      setCheckedUser(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSort = (key, direction) => {
    const sortedUsers = [...usersData].sort((a, b) =>
      direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key])
    );
    setUsersData(sortedUsers);
    setNameSortDir(direction === "asc" ? "desc" : "asc");
  };

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

      <div className="d-flex mb-3 justify-content-between">
        <input 
          type="text" 
          placeholder="Search by name, username, email or id" 
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-25"
        />

        <div>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/admin/dashboard/users/create")}
          >
            Create User
          </Button>
          {checkedUser.length > 0 && (
            <Button
              variant="outline-danger"
              onClick={() => setIsShow(true)}
              className="ms-3"
            >
              Delete Users
            </Button>
          )}
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <FormCheck
                type="checkbox"
                checked={checkAll}
                onChange={handleCheckAll}
              />
            </th>
            <th>Id</th>
            <th
              onClick={() => handleSort("full_name", nameSortDir)}
              style={{ cursor: "pointer" }}
            >
              Name
            </th>
            <th
              onClick={() => handleSort("user_name", nameSortDir)}
              style={{ cursor: "pointer" }}
            >
              Username
            </th>
            <th
              onClick={() => handleSort("email", nameSortDir)}
              style={{ cursor: "pointer" }}
            >
              Email
            </th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isUserLoading ? (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          ) : (
            filteredUsers
              ?.filter((user) => user.role === "user")
              .map((user) => (
                <tr
                  key={user._id}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <FormCheck
                      type="checkbox"
                      checked={checkedUser.includes(user._id)}
                      onChange={(e) => handleCheckUser(e, user._id)}
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
                      to={`/admin/dashboard/users/${user._id}`}
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
            onClick={() => setIsShow(false)}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminUsers;
