import config from "../config";
import axios from "axios";
import qs from "qs";

//Generate Access Token
export default async function getToken() {
  const { authUrl, clientId, clientSecret } = config.api;
  const {
    data: { access_token: token },
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
  return token;
}
