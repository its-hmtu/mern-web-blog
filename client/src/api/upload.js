import { ENDPOINTS } from "src/routes/api.path";
import axios from "axios";
import { axiosInstance } from "./user";

export const uploadFile = async (file) => {
  try {
    const { data } = await axiosInstance.post(ENDPOINTS.upload, file);
    console.log(file)
    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }

    return data.data;
  } catch (error) {
    console.log(error.message)
  }
}