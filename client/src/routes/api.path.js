import { getCategories } from "api/post"
import { getAllUsers } from "api/user"

const BASE = 'http://localhost:5000/v1'

export const ENDPOINTS = {
  register: `${BASE}/auth/register`,
  login: `${BASE}/auth/login`,
  logout: `${BASE}/auth/logout`,
  forgotPassword: `${BASE}/auth/forgot-password`,
  resendConfirmationEmail: `${BASE}/auth/resend`,
  resetPassword: `${BASE}/auth/reset-password`,

  getCurrentUser: `${BASE}/users/me`,
  updateCurrentUser: `${BASE}/users/me/update`,
  changePasswordCurrentUser: `${BASE}/users/me/change-password`,
  refreshToken: `${BASE}/users/refresh-token`,
  changAvatar: `${BASE}/users/change-avatar`,
  followUser: `${BASE}/users/follow`,
  deleteUser: `${BASE}/users`,
  getUser: `${BASE}/users/profile`,
  getCurrentUserComments: `${BASE}/comments/me`,
  getAllUsers: `${BASE}/users/all`,
  getUserPosts: `${BASE}/posts/user`,
  getUserComments: `${BASE}/comments/user`,

  getPosts: `${BASE}/posts`,
  getSinglePost: `${BASE}/posts`,
  createPost: `${BASE}/posts/create`,
  addToReadingList: `${BASE}/posts/reading-list`,
  getPostComments: `${BASE}/comments`,


  getCategories: `${BASE}/categories`,
}