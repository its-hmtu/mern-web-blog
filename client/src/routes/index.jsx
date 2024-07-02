import { Routes, Route } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import RegisterPage from "pages/RegisterPage";
import CheckEmailPage from "pages/CheckEmailPage";
import ProfilePage from "pages/ProfilePage";
import ReadingListPage from "pages/ReadingListPage";
import CreatePage from "pages/CreatePage";
import NotificationsPage from "pages/NotificationsPage";

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reading-list" element={<ReadingListPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email-confirmation" element={<CheckEmailPage />} />
      <Route path="/create-post" element={<CreatePage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default RouteList