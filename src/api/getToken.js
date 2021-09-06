import config from "../config";
import axios from "axios";
import qs from "qs";

let token = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

export default async function getToken() {
  if (token === null) {
    const { authUrl, clientId, clientSecret } = config.api;
    const {
      data: { access_token: access_token },
    } = await axios.post(
      authUrl,
      qs.stringify({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }
    );
    localStorage.setItem("accessToken", access_token);
    token = access_token;
  }
  return token;
}
