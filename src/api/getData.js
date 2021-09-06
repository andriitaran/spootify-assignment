import config from "../config";
import axios from "axios";

export default async function getData(path, token) {
  const { baseUrl } = config.api;
  const res = await axios.get(`${baseUrl}/browse/${path}?locale=en_US`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}
