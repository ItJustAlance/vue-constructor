// eslint-disable-next-line no-unused-vars
import { loginUser, refresh, refreshAuthUser } from "@/api/auth";
import router from "@/router/index.js";
import { generateErrors } from "@/utils/helpers";
import { setStateAuthInjectionToApi } from "@/api/authData";
import jwtDecode from "jwt-decode";

// import { me } from '@/api/user';
// import UserService from '../../service/UserService';

const state = () => ({
  isAuth: false,
  user: {},
  refreshTokenId: null,
  accessToken: null
});

const mutations = {
  clearAccessData(state) {
    console.log("clearAccessData");
    state.isAuth = false;
    state.user = {};
    state.refreshTokenId = null;
    state.accessToken = null;
    state.login = null;
    localStorage.removeItem("refreshTokenId");
  },
  setAccessData(state, payload) {
    console.log("setAccessData1", payload);
    state.refreshTokenId = payload.data.token;
    state.accessToken = payload.data.token;
    state.user = payload.data;
    localStorage.setItem("refreshTokenId", payload.data.token);
  },
  setLoginData(state, payload) {
    state.login = payload.login;
  },
  setAuthStatus(state, payload) {
    state.isAuth = payload;
  },
  setRefreshTokenId(state, payload) {
    console.log("setRefreshTokenId", payload);
    state.refreshTokenId = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};

const getters = {
  userPermissionsObject(state) {
    const { user } = state;
    if (!user) {
      return {};
    }
    const { userPermissions } = user;
    if (!userPermissions) {
      return {};
    }
    const result = {};
    state.user.userPermissions.forEach(({ id }) => {
      result[id] = true;
    });
    return result;
  }
};

const actions = {
  async init(ctx) {
    setStateAuthInjectionToApi(ctx);

    if (!ctx.state.refreshTokenId) {
      console.log("!ctx.state.refreshTokenId");
      const tokenLS = localStorage.getItem("refreshTokenId");
      console.log("tokenLS", tokenLS);
      if (!tokenLS) {
        console.log("!tokenLS");
        await ctx.commit("clearAccessData");
        ctx.commit("general/setGlobalLoader", false, { root: true });
        return;
      } else {
        // Если токен есть, но данных user нет
        ctx.commit("setRefreshTokenId", tokenLS);
        let refreshResult = await refreshAuthUser();

        /** если по данному токену нет данных юзера, перекидываем на login и чистим данные **/
        if (refreshResult.status == "error") {
          await ctx.commit("clearAccessData");
          await router.push({ name: "login" }).catch(() => {});
          return false;
        }
        console.log("commit setAccessData refreshResult", refreshResult);
        refreshResult.data.token = tokenLS;

        ctx.commit("setAccessData", refreshResult);
        console.log("refreshResult", refreshResult);
      }

      // Нужно для refresh, т.к. есть инъекция в api/authData из StoreStateAuth
      // ctx.commit('setRefreshTokenId', tokenLS);
    }
    // await ctx.dispatch('getMe');
    // await ctx.dispatch('getNotifications')

    // ctx.commit('setGlobalLoader', false, { root: true });
  },
  async login(ctx, payload) {
    try {
      const accessDataAttributes = await loginUser(payload);
      console.log("accessDataAttributes1111", accessDataAttributes);
      if (
        accessDataAttributes &&
        accessDataAttributes.data.status !== "error"
      ) {
        console.log("commit setAccessData accessDataAttributes.data");
        ctx.commit("setAccessData", accessDataAttributes.data);
        localStorage.removeItem("dataEntryFilter");
        localStorage.removeItem("aggregateFilter");
        await ctx.dispatch("getMe");
        return true;
      } else {
        return accessDataAttributes;
      }
    } catch (error) {
      ctx.commit("setLoginData", payload);
      generateErrors(error, "login");
    }
  },
  async logout(ctx) {
    await router.push("/auth/login");
    ctx.commit("clearAccessData");
  },
  async getMe(ctx) {
    try {
      console.log("getMe");
      // me() запрос на разграничение ролей
      // const user = await me();
      // ctx.commit('setUser', user);
      ctx.commit("setAuthStatus", true);

      // const a = {};
      // user.userPermissions.forEach(i => {
      //   a[i.id] = i.id;
      // });
    } catch {
      await ctx.commit("clearAccessData");
    }
  },
  isAccessTokenValid(ctx) {
    console.log("isAccessTokenValid");
    if (!ctx.state.accessToken) return false;
    const accessTokenInfo = jwtDecode(ctx.state.accessToken);
    if (!accessTokenInfo) return false;
    const { exp } = accessTokenInfo;
    return parseFloat(exp) * 1000 >= +new Date();
  },

  async AccessTokenCheck(ctx) {
    try {
      console.log("AccessTokenCheck тут зацикливание", ctx);
      // const accessTokenValid = await ctx.dispatch('isAccessTokenValid');
      // if (!accessTokenValid) {
      //   console.log('!accessTokenValid')
      //   // const refreshResult = await refresh();
      //   const refreshResult = true;
      //   console.log('refreshResult', refreshResult)
      //
      //   if (!refreshResult) {
      //     await router.push('/login');
      //     ctx.commit('general/setGlobalLoader', false, { root: true });
      //     ctx.commit('clearAccessData');
      //     return;
      //   }
      //   ctx.commit('setAccessData', refreshResult.attributes);
      //   return true;
      // }
      // return accessTokenValid;
    } catch (e) {
      console.log("referr", e);
    }
  },
  async getUserBeforeReload(context) {
    if (
      "userPermissions" in context.state.user ||
      !context.state.refreshTokenId
    )
      return;
    await context.dispatch("getMe");
    context.commit("general/setGlobalLoader", false, { root: true });
  }
  // async createUser({commit}, user) {
  //     try {
  //         await new UserService().createUser(user)
  //         commit('setToastMessage',{type: 'success', title: 'Успешно', subTitle: 'Пользователь создан'})
  //         return true
  //     } catch (err) {
  //         const { response } = err
  //         if(!response) return commit('setToastMessage',{type: 'error', title: 'Ошибка при создании пользователя', subTitle: err})
  //         const { data } = response
  //         commit('setToastMessage',{type: 'error', title: 'Ошибка при создании пользователя', subTitle: data?.code + ' ' + data?.message})
  //         return false
  //     } finally {
  //
  //     }
  // },
  // async updateUser({ commit }, user) {
  //     try {
  //         await new UserService().updateUser(user.username, user)
  //         commit('setToastMessage', {type: 'success', title: 'Успешно', subTitle: 'Пользователь отредактирован'})
  //         return true
  //     } catch (err) {
  //         const { response } = err
  //         if(!response) return commit('setToastMessage',{type: 'error', title: 'Ошибка при редактировании пользователя', subTitle: err})
  //         const { data } = response
  //         commit('setToastMessage',{type: 'error', title: 'Ошибка при редактировании пользователя', subTitle: data?.code + ' ' + data?.message})
  //         return false
  //     } finally {
  //
  //     }
  // },
  // async updatePassword({commit}, data) {
  //     try {
  //         await new UserService().updatePassword(data)
  //         return true
  //     } catch (err) {
  //         const { response } = err
  //         if(!response) return commit('setToastMessage',{type: 'error', title: 'Ошибка при смене пароля', subTitle: err})
  //         const { data } = response
  //         commit('setToastMessage',{type: 'error', title: 'Ошибка при смене пароля', subTitle: data?.code + ' ' + data?.message})
  //         return false
  //     } finally {
  //
  //     }
  // },
  // async getUsersList({commit}, filters) {
  //     try {
  //         commit('setListLoading', true)
  //         const {data: { content } } = await new UserService().getUsersList(filters)
  //         return content
  //     } catch (err) {
  //         const { response } = err
  //         if(!response) return commit('setToastMessage',{type: 'error', title: 'Ошибка при получении списка', subTitle: err})
  //         const { data } = response
  //         commit('setToastMessage',{type: 'error', title: 'Ошибка при получении списка', subTitle: data?.code + ' ' + data?.message})
  //     } finally {
  //         commit('setListLoading', false)
  //     }
  // }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
