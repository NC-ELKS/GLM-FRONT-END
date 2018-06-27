import axios from "axios";
import url from "./config";

export const fetchMessages = async username => {
  console.log(username, "username");
  const { data } = await axios.get(`${url}/messages/${username}`);
  console.log(Object.keys(data), "keys");
  return data;
};
