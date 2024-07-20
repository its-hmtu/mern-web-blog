import React from "react";
import Header from "layouts/MainLayout/components/Header";
import { Link, Outlet } from "react-router-dom";
import {
  CDBSidebar as Sidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";

const AdminLayout = () => {
  return (
    <>
      <div className="admin-layout__container">
        <Header admin />
        <Outlet />
        <Sidebar
          textColor="#333"
          backgroundColor="#f5f5f5"
          className=""
          style={{ height: "100%", position: "fixed", top: "56px", left: 0 }}
          maxWidth="245px"
        >
          <CDBSidebarHeader
            prefix={<i className="fa fa-bars" />}
          ></CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <Link to="/admin/dashboard">
                <CDBSidebarMenuItem icon="columns" className="fw-semibold">
                  Dashboard
                </CDBSidebarMenuItem>
              </Link>
              <Link to="/admin/dashboard/users">
                <CDBSidebarMenuItem icon="user" className="fw-semibold">
                  Manage User
                </CDBSidebarMenuItem>
              </Link>
              <Link to="/admin/dashboard/admin-users">
                <CDBSidebarMenuItem icon="users" className="fw-semibold">
                  Manage Admin
                </CDBSidebarMenuItem>
              </Link>
              <Link to="/admin/dashboard/posts">
                <CDBSidebarMenuItem icon="file-alt" className="fw-semibold">
                  Manage Post
                </CDBSidebarMenuItem>
              </Link>
              <Link to="/admin/dashboard/posts">
                <CDBSidebarMenuItem icon="comment" className="fw-semibold">
                  Manage Comment
                </CDBSidebarMenuItem>
              </Link>
              <Link to="/admin/dashboard/categories">
                <CDBSidebarMenuItem icon="tag" className="fw-semibold">
                  Manage Category
                </CDBSidebarMenuItem>
              </Link>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </Sidebar>
      </div>
    </>
  );
};

export default AdminLayout;
