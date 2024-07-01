import axios from "axios";
import { ENDPOINTS } from "src/routes/api.path";

export const registerUser = async (user) => {
  const { data } = await axios.post(ENDPOINTS.register, user);
  if (data.success === false) {
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