import axios from "axios";
import { getAccessToken, getStoreAuth } from "@/api/authData";

// const apiUrl = import.meta.env.VUE_APP_API_URL;
const apiUrl = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(async request => {
  console.log("apiUrl", apiUrl);
  const { common } = request.headers;
  //const { url } = request;

  // request.headers.Accept = 'application/json;charset=utf8';
  // request.headers['Content-Type'] = 'application/json;charset=utf8';

  const storeAuth = getStoreAuth();
  console.log("storeAuth", storeAuth);
  const accessTokenValid = await storeAuth.dispatch("AccessTokenCheck");

  if (accessTokenValid) {
    const accessToken = getAccessToken();
    if (
      !common.Authorization &&
      common.Authorization !== "Bearer undefined" &&
      accessToken
    ) {
      request.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }
  return request;
});

axios.interceptors.response.use(
  response => response,
  async error => {
    //const { response } = error;

    return Promise.reject(error);
  }
);

export { axios, apiUrl };
