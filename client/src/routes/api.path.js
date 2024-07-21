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
  getUserPosts: `${BASE}/posts/user`,
  getUserComments: `${BASE}/comments/user`,
  
  getPosts: `${BASE}/posts`,
  getSinglePost: `${BASE}/posts`,
  createPost: `${BASE}/posts/create`,
  addToReadingList: `${BASE}/posts/reading-list`,
  getPostComments: `${BASE}/comments`,
  updateViewsCount: `${BASE}/posts/views-count`,
  deletePost: `${BASE}/posts`,
  updatePost: `${BASE}/posts/update`,
  likePost: `${BASE}/posts`,

  createComment: `${BASE}/comments/create`,
  
  getCategories: `${BASE}/categories`,
  getAllUsers: `${BASE}/admin/all`,
  getReadingList: `${BASE}/posts/reading-list`,

  deleteUserAdmin: `${BASE}/admin/delete-user`,
  deletePostAdmin: `${BASE}/admin/delete-post`,

  upload: `${BASE}/upload`,
}