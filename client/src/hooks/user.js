import { useMutation, useQueryClient } from "react-query";
import { registerUser, loginUser, getUser } from "api/user";

export const userQueryKey = "user-info";

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

export const getUserQuery = (id) => ({
  queryKey: [userQueryKey, {id}],
  queryFn: getUser,
})