import { useMutation, useQueryClient } from "react-query";
import { registerUser, loginUser, getUser, getCurrentUser, logoutUser, getCurrentUserComments, getAllUsers } from "api/user";

export const userQueryKey = "user-info";
// export const currentUserQueryKey = "me";
export const userCommentsKey = "user-comments";
export const allUsersKey = "all-users";

export const useRegisterUser = (succes = () => {}, error = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation(registerUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data);
      succes(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(userQueryKey);
    },
    onError: (err) => {
      error(err.response.data.message);
    }
  })
}

export const useLoginUser = (succes = () => {}, error = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation(loginUser, {
    onSuccess: async (data) => {
      localStorage.setItem('access_token', JSON.stringify(data.access_token))
      // localStorage.setItem("user", JSON.stringify(data.data))
      queryClient.setQueryData(userQueryKey, data.data);
      succes(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(userQueryKey);
    },
    onError: (err) => {
      error(err.response.data.message);
    }
  })
}

export const useLogoutUser = (succes = () => {}, error = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(logoutUser, {
    onSuccess: (data) => {
      // localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      queryClient.removeQueries(userQueryKey);
      succes(data)
    },
    onError: (err) => {
      error(err.response.data.message)
    }
  })
}

export const getUserQuery = (id) => ({
  queryKey: [userQueryKey, {id}],
  queryFn: getUser,
})

export const getCurrentUserQuery = () => ({
  queryKey: [userQueryKey],
  queryFn: getCurrentUser,
})

export const getCurrentUserCommentsQuery = (page = 1, limit = 5, order = 'desc') => ({
  queryKey: [userCommentsKey, { page, limit, order }],
  queryFn: getCurrentUserComments,
})

export const getAllUsersQuery = (page = 1, limit = 5, order = 'desc') => ({
  queryKey: ["all-users", { page, limit, order }],
  queryFn: getAllUsers,
})