import axios from "axios";
import { ENDPOINTS } from "src/routes/api.path";

export const getPosts = async ({queryKey}) => {
  try {
    const [, {page, limit, order}] = queryKey;
    const { data } = await axios.get(`${ENDPOINTS.getPosts}?page=${page}&limit=${limit}&order=${order}`);
    console.log(`${ENDPOINTS.getPosts}?page=${page}&limit=${limit}&order=${order}`)

    return data;
  } catch (e) {
    const { message } = e.response.data;
    console.log(message);
    return message;
  }
}