import { useMutation, useQueryClient } from "react-query";
import { addToReadingList, createComment, createPost, deletePost, getCategories, getPostComments, getPosts, getReadingList, getSinglePost, getUserComments, getUserPosts, likePost, updatePost, updateViewsCount } from "api/post";
import { userQueryKey } from "./user";

export const postsQueryKey = "posts"
export const categoryQueryKey = "categories"
export const postCommentsQueryKey = "post-comments"
export const userCommentsQueryKey = "user-comments"
export const userPostsQueryKey = "user-posts"
export const postQueryKey = "post"

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
  queryKey: [postsQueryKey, { page, limit, order, category, postIds, currentUserId}],
  queryFn: getPosts,
})

export const getSinglePostQuery = (slug) => ({
  queryKey: [postQueryKey, { slug }],
  queryFn: getSinglePost,
})

export const useCreatePost = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(userQueryKey);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(userQueryKey);
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
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(userQueryKey);
      queryClient.invalidateQueries(postQueryKey);
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
  queryFn: getUserComments,
})

export const getReadingListQuery = () => ({
  queryKey: ["reading-list"],
  queryFn: getReadingList,
})

export const useUpdateViewsCount = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(updateViewsCount, {
    onSuccess: (data) => {
      queryClient.setQueryData(postQueryKey, data.data);
      success(data)
    },
    onSettled: () => {
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(postQueryKey);
    },
    onError: (error) => {
      console.log(error.response.data.message);
    }
  })
}

export const useDeletePost = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(userQueryKey);
      success();
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}

export const useUpdatePost = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(userQueryKey);
      success();
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}

export const useLikePost = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(userQueryKey);
      queryClient.invalidateQueries(postQueryKey);
      success();
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}

export const useCreateComment = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(postCommentsQueryKey);
      queryClient.invalidateQueries(userCommentsQueryKey);
      queryClient.invalidateQueries(userQueryKey);
      queryClient.invalidateQueries(postsQueryKey);
      queryClient.invalidateQueries(postQueryKey);
      success();
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}