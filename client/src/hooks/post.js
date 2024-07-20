import { useMutation, useQueryClient } from "react-query";
import { addToReadingList, createPost, getCategories, getPostComments, getPosts, getSinglePost, getUserPosts } from "api/post";
import { userQueryKey } from "./user";

export const postQueryKey = "posts"
export const categoryQueryKey = "categories"
export const postCommentsQueryKey = "post-comments"
export const userCommentsQueryKey = "user-comments"
export const userPostsQueryKey = "user-posts"

// Post comments
export const getPostCommentsQuery = (postId) => ({
  queryKey: [postCommentsQueryKey, { postId }],
  queryFn: getPostComments,
})

// Categories

export const getCategoriesQuery = () => ({
  queryKey: [categoryQueryKey],
  queryFn: getCategories,
})

// Posts

export const getPostsQuery = (page = 0, limit = 10, order = 'asc', category = '', postIds = '', currentUserId = '') => ({
  queryKey: [postQueryKey, { page, limit, order, category, postIds, currentUserId}],
  queryFn: getPosts,
})

export const getSinglePostQuery = (slug) => ({
  queryKey: [postQueryKey, { slug }],
  queryFn: getSinglePost,
})

export const useCreatePost = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(createPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(postQueryKey);
      success(data);
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}

export const useAddReadingList = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(addToReadingList, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(postQueryKey);
      queryClient.invalidateQueries(userQueryKey);
      success(data);
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}

export const getUserPostsQuery = (id, page = 1, limit = 5, order = 'desc') => ({
  queryKey: [userPostsQueryKey, { id, page, limit, order }],
  queryFn: getUserPosts,
})

export const getUserCommentsQuery = (id, page = 1, limit = 5, order = 'desc') => ({
  queryKey: [userCommentsQueryKey, { id, page, limit, order }],
  queryFn: getUserPosts,
})