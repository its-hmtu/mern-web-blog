import { ENDPOINTS } from "src/routes/api.path";
import axios from "axios";
import { axiosInstance } from "./user";

export const deleteUserAdmin = async (ids) => {
  try {
    const {data} = await axiosInstance.delete(`${ENDPOINTS.deleteUserAdmin}?ids=${ids}`, {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    const {message} = e.response.data;
    console.log(message);
    return message;
  }
}

export const deletePostAdmin = async (ids) => {
  try {
    const {data} = await axiosInstance.delete(`${ENDPOINTS.deletePostAdmin}?ids=${ids}`, {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    const {message} = e.response.data;
    console.log(message);
    return message;
  }
}