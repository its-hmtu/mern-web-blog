import { useMutation, useQueryClient } from "react-query";
import { registerUser } from "api/user";

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