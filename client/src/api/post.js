import { ENDPOINTS } from "src/routes/api.path";
import axios from "axios";
import { axiosInstance } from "./user";

// Categories

export const getCategories = async () => {
  try {
    const {data} = await axios.get(ENDPOINTS.getCategories);
    if (data.success !== true) {
      console.log(data.message);
      throw new Error(data.message);
    }

    console.log(data.data)
    return data.data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}

// Posts

export const getPosts = async ({ queryKey }) => {
  try {
    const [, { page, limit, order, category, postIds, currentUserId }] =
      queryKey;
    const { data } = await axios.get(
      `${
        ENDPOINTS.getPosts
      }?page=${page}&limit=${limit}&order=${order}&category=${category}&postIds=${postIds}${
        currentUserId === "" ? "" : `&currentUserId=${currentUserId}`
      }`
    );
    // console.log(`${ENDPOINTS.getPosts}?page=${page}&limit=${limit}&order=${order}`)
    // console.log(data);
    return data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
};

export const getSinglePost = async ({queryKey}) => {
  try {
    const [, { slug }] = queryKey;
    const { data } = await axios.get(`${ENDPOINTS.getSinglePost}/${slug}`);
    if (data.status !== 'success') {
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

export const createPost = async (formData) => {
  try {
    const { data } = await axiosInstance.post(ENDPOINTS.createPost, formData);
    if (data.status !== "success") {
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

export const addToReadingList = async ({ postId, add }) => {
  try {
    const { data } = await axiosInstance.put(`${ENDPOINTS.addToReadingList}/${postId}?add=${add}`);

    if (data.status !== "success") {
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
