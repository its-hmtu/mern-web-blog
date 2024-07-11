import { Routes, Route } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import HomePage from 'pages/HomePage';
import SignInPage from 'pages/SignInPage';
import RegisterPage from 'pages/RegisterPage';
import CheckEmailPage from 'pages/CheckEmailPage';
import ProfilePage from 'pages/ProfilePage';
import ReadingListPage from 'pages/ReadingListPage';
import CreatePage from 'pages/CreatePage';
import NotificationsPage from 'pages/NotificationsPage';
import CreatePost from '../components/CreatePost'; // Sửa đường dẫn này

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="reading-list" element={<ReadingListPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="post/:slug" element={<h1>Post</h1>} />
        <Route path="create-post" element={<CreatePost />} />
      </Route>
      <Route path="signin" element={<SignInPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="email-confirmation" element={<CheckEmailPage />} />
      <Route path="create" element={<CreatePage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default RouteList;
