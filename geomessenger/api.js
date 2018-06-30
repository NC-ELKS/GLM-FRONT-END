import axios from "axios";
import url from "./config";

export const fetchMessages = async username => {
  const { data } = await axios.get(`${url}/messages/${username}`);
  return data;
};

export const postMessage = async (
  content,
  recipient,
  msgPoster,
  latitude,
  longitude
) => {
  const { data } = await axios.post(`${url}/messages`, {
    content: content,
    recipient: recipient,
    msgPoster: msgPoster,
    longitude: longitude,
    latitude: latitude
  });
  return data;
};

export const getUser = async username => {
  const { data } = await axios.get(`${url}/users/${username}`);

  return data;
};
