import axios from "axios";
import { ENDPOINTS } from "src/routes/api.path";

export const registerUser = async (user) => {
  const { data } = await axios.post(ENDPOINTS.register, user);
  if (data.success === "false") {
    console.log(data.message);
    return data.message;
  }
  try {
    console.log(data['access_token'])
    return data['access_token'];
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
    return message;
  }
}

export const loginUser = async (user) => {
  try {
    const {data} = await axios.post(ENDPOINTS.login, user);
    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}

export const logoutUser = async () => {
  try {
    const { data } = await axios.post(ENDPOINTS.logout);
    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}

export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(ENDPOINTS.forgotPassword, email);
    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}

export const getUser = async ({queryKey}) => {
  try {
    const [, {id}] = queryKey;
    const { data } = await axios.get(`${ENDPOINTS.getUser}/${id}`);
    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }

    return data.data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}