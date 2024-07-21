import { ENDPOINTS } from "src/routes/api.path";
import axios from "axios";
import { axiosInstance } from "./user";

// Comments
export const getPostComments = async ({ queryKey }) => {
  try {
    const [, { postId }] = queryKey;
    const { data } = await axios.get(
      `${ENDPOINTS.getPostComments}?post=${postId}`
    );

    // if (data.success !== true) {
    //   console.log(data.message);
    //   throw new Error(data.message);
    // }

    return data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
};

// Categories

export const getCategories = async () => {
  try {
    const { data } = await axios.get(ENDPOINTS.getCategories);
    if (data.success !== true) {
      console.log(data.message);
      throw new Error(data.message);
    }

    console.log(data.data);
    return data.data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
};

// Posts

export const getPosts = async ({ queryKey }) => {
  try {
    const [, { page, limit, order, category, postIds, currentUserId }] =
      queryKey;
    const { data } = await axios.get(
      `${
        ENDPOINTS.getPosts
      }?${page === "" ? "" : `page=${page}`}${limit === "" ? "" : `&limit=${limit}`}${order===""?"":`&order=${order}`}${category===""?"":`&category=${category}`}${postIds===""?"":`&postIds=${postIds}`}${
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

export const getSinglePost = async ({ queryKey }) => {
  try {
    const [, { slug }] = queryKey;
    const { data } = await axios.get(`${ENDPOINTS.getSinglePost}/${slug}`);
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
};

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
};

export const addToReadingList = async ({ postId, add }) => {
  try {
    const { data } = await axiosInstance.put(
      `${ENDPOINTS.addToReadingList}/${postId}?add=${add}`
    );

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
};

export const getUserPosts = async ({ queryKey }) => {
  try {
    const [, { id, page, limit, order }] = queryKey;
    const { data } = await axiosInstance.get(
      `${ENDPOINTS.getUserPosts}/${id}?page=${page}&limit=${limit}&order=${order}`
    );
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
};

export const getUserComments = async ({ queryKey }) => {
  try {
    const [, { id, page, limit, order }] = queryKey;
    const { data } = await axiosInstance.get(
      `${ENDPOINTS.getUserComments}/${id}?page=${page}&limit=${limit}&order=${order}`
    );
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

export const getReadingList = async () => {
  try {
    const { data } = await axiosInstance.get(ENDPOINTS.getReadingList);
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

