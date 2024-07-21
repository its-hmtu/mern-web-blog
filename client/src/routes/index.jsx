import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import ProfilePage from "../pages/ProfilePage";
import ReadingListPage from "../pages/ReadingListPage";
import CreatePage from "pages/CreatePage";
import NotificationsPage from "../pages/NotificationsPage";
import Dashboard from "../pages/Dashboard";
import SettingsPage from "../pages/SettingsPage";
import TermsAndConditions from "../pages/TermsAndConditions";
import NotFoundPage from "../pages/NotFoundPage";
import PostView from "../components/PostView";
import CategoriesPage from "../components/CategoriesPage";
import About from "../components/About"; // Import the About component
import AdminPage from "pages/AdminPage";
import AdminLogin from "pages/AdminPage/pages/AdminLogin";
import AdminDashBoard from "pages/AdminPage/pages/AdminDashboard";
import AdminLayout from "layouts/AdminLayout";
import AdminUsers from "pages/AdminPage/pages/AdminUsers";
import AdminUsersTeam from "pages/AdminPage/pages/AdminUsersTeam";
import UserShow from "pages/AdminPage/pages/components/UserShow";
import UserEdit from "pages/AdminPage/pages/components/UserEdit";
import EmailVerified from "pages/EmailVerified";

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="reading-list" element={<ReadingListPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="terms-of-use" element={<TermsAndConditions />} />
        <Route path="post/:path" element={<PostView />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="signin" element={<SignInPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="email-confirmation" element={<CheckEmailPage />} />
      <Route path="email-verified" element={<EmailVerified />}/>
      <Route path="create-post" element={<CreatePage />} />
      <Route path="admin">
        <Route index element={<AdminPage></AdminPage>} />
        <Route path="login" element={<AdminLogin></AdminLogin>} />
        <Route path="dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashBoard />} />
          <Route path="users" element={<AdminUsers />}/>
          <Route path="users/:id" element={<UserShow />} />
          <Route path="users/:id/edit" element={<UserEdit />} />
          <Route path="admin-users" element={<AdminUsersTeam />} />
          <Route path="admin-users/:id" element={<UserShow />} />
          <Route path="admin-users/:id/edit" element={<UserEdit />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouteList;
