import { useMutation, useQueryClient } from "react-query";
import { addToReadingList, createPost, getCategories, getPosts, getSinglePost } from "api/post";
import { userQueryKey } from "./user";

export const postQueryKey = "posts"
export const categoryQueryKey = "categories"

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