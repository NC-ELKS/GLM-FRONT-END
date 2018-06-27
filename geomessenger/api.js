import axios from "axios";
import url from "./config";

export const fetchMessages = async username => {
  const { data } = await axios.get(`${url}/messages/${username}`);
  return data;
};
