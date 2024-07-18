import { ENDPOINTS } from "src/routes/api.path";
import axios from "axios";

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
