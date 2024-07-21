import { deletePostAdmin, deleteUserAdmin } from "api/admin";
import { useMutation, useQueryClient } from "react-query";
import { allUsersKey } from "./user";

export const useDeleteUserAdmin = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation(deleteUserAdmin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(allUsersKey);
      success(data);
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}

export const useDeletePostAdmin = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation(deletePostAdmin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user-info");
      success(data);
    },
    onError: (error) => {
      error(error.response.data.message);
    }
  })
}