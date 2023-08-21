import { apiUrl, axios } from "@/api/api.js";
import { getRefreshTokenId } from "./authData";
import router from "@/router/index.js";

// eslint-disable-next-line no-unused-vars
export async function getSend(url, params) {
  try {
    const refreshTokenId = getRefreshTokenId();

    let result = null;
    if (refreshTokenId !== null) {
      result = await axios.get(`${apiUrl}/${url}`, {
        headers: {
          Authorization: refreshTokenId
        },
        params: params
      });
    }
    const accessData = result.data;
    console.log("global accessData", accessData);
    return accessData ? accessData : false;
  } catch (error) {
    console.log("error", error);
    /** Кидаем на логин, если токен не получен */
    await router.push({ name: "login" }).catch(() => {});
  }
}
