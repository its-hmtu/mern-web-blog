import { useMutation, useQueryClient } from "react-query";
import { getPosts } from "api/post";

export const postQueryKey = "posts"

export const getPostsQuery = (page = 0, limit = 10, order = 'asc', category = '', postIds = '', currentUserId = '') => ({
  queryKey: [postQueryKey, { page, limit, order, category, postIds, currentUserId}],
  queryFn: getPosts,
})