import { useMutation, useQueryClient } from "react-query";
import { uploadFile } from "api/upload";

export const useUploadFile = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation(uploadFile, {
    onSuccess: (data) => {
      success(data);
    },
    onError: (err) => {
      error(err.response.data.message);
    },
  });
}