import { apiUrl, axios } from "@/api/api.js";
import { getRefreshTokenId } from "./authData";
import router from "@/router";

export async function loginUser(data) {
  try {
    const form = new FormData();
    form.append("login", data.login);
    form.append("password", data.password); // cZ9mQcrBsPK7P
    form.append("remember", data.remember);
    const result = await axios.post(`${apiUrl}/auth`, form);
    return result;
  } catch (error) {
    console.err(error);
    throw error;
  }
}

// export async function refresh() {
//   try {
//     /* eslint-disable */
//     const refreshTokenId = getRefreshTokenId();
//     console.log('refresh', refreshTokenId);
//
//     let result = null;
//     if(refreshTokenId !== null){
//       result = axios.get(`${ apiUrl }/user?Authorization=${refreshTokenId}`);
//     }
//
//     console.log('result', result)
//     const accessData = result.data.data;
//
//     return accessData ? accessData : false;
//   } catch (error) {
//     console.log('error', error)
//     /** Кидаем на логин, если токен не получен */
//     // await router.push({ name: 'login' }).catch(() => {});
//   }
// }
export async function refreshAuthUser() {
  try {
    const refreshTokenId = getRefreshTokenId();
    console.log("refreshAuthUser", refreshTokenId);
    let result = null;
    if (refreshTokenId !== null) {
      result = await axios.get(`${apiUrl}/user`, {
        headers: {
          Authorization: refreshTokenId
        }
      });
    }

    console.log("result", result);
    const accessData = result.data;
    return accessData ? accessData : false;
  } catch (error) {
    console.log("error", error);
    /** Кидаем на логин, если токен не получен */
    await router.push({ name: "login" }).catch(() => {});
  }
}

// import { apiUrl } from './api.js'
//
// export async function loginUser(data) {
//
//   const url = `${ apiUrl }/auth`;
//   const form = new FormData();
//   console.log('data', data)
//   form.append('login', 'admin');
//   form.append('password', 'cZ9mQcrBsPK7P');
//
//   const options = {method: 'POST'};
//
//   options.body = form;
//
//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }
