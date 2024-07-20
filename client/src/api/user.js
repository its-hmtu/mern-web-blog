import axios, { AxiosHeaders } from "axios";
import { ENDPOINTS } from "src/routes/api.path";
import { jwtDecode } from "jwt-decode";

const handleDecode = () => {
  let storage = JSON.parse(localStorage.getItem("access_token"));
  console.log(storage)
  let decoded = {};
  if (storage) {
    decoded = jwtDecode(storage);
  }
  console.log("decoded", decoded);
  return {decoded, storage};
};

export const axiosInstance = axios.create({
  baseURL: ENDPOINTS.baseUrl,
});

axiosInstance.interceptors.request.use(async (config) => {
  const currentTime = new Date();
  const { decoded, storage } = handleDecode();
  if (decoded?.exp < currentTime.getTime() / 1000) {
    const data = await refreshToken();
    config.headers.Authorization = `Bearer ${data?.access_token}`;
  } else {
    config.headers.Authorization = `Bearer ${storage}`;
  }

  return config;
}, 
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// axios.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage.getItem("access_token"));
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const refreshToken = async () => {
  const {data} = await axios.get(ENDPOINTS.refreshToken, {
    withCredentials: true,
  });
  if (data.success === "false") {
    console.log("Fail");
  }
  localStorage.setItem("access_token", JSON.stringify(data?.access_token));
  // console.log(data);
  return data;
};

export const registerUser = async (user) => {
  const { data } = await axios.post(ENDPOINTS.register, user);
  if (data.success === "false") {
    console.log(data.message);
    return data.message;
  }
  try {
    console.log(data["access_token"]);
    return data;
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
    return message;
  }
};

export const loginUser = async (user) => {
  const { data } = await axios.post(ENDPOINTS.login, user, {
    withCredentials: true,
  });
  if (data.success === "false") {
    console.log(data.message);
    return data.message;
  }

  try {
    return data;
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
    return message;
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axiosInstance.post(ENDPOINTS.logout, {
      withCredentials: true,
    });
    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }

    return data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
};

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
};

export const getUser = async ({ queryKey }) => {
  try {
    const [, { id }] = queryKey;
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
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get(ENDPOINTS.getCurrentUser);

    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }
    console.log(data)
    return data.data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
};

export const getAllUsers = async ({ queryKey }) => {
  try {
    const [, { page, limit, order }] = queryKey;
    const { data } = await axios.get(
      `${ENDPOINTS.getAllUsers}?page=${page}&limit=${limit}&order=${order}`
    );

    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }

    return data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}

export const getCurrentUserComments = async ({queryKey}) => {
  try {
    const [, { page, limit, order}] = queryKey
    const { data } = await axiosInstance.get(
      `${ENDPOINTS.getCurrentUserComments}?page=${page}&limit=${limit}&order=${order}`
    );

    if (data.success === "false") {
      console.log(data.message);
      return data.message;
    }

    return data.comments;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}