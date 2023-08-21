// import Axios from "axios";

const state = () => ({
  globalLoader: true,
  checkedAfterLogin: false,
  theme: "",
  mqType: null,
  mqSize: {
    xs: 450,
    sm: 600,
    md: 768,
    lg: 1000,
    xl: 1200,
    hd: 1440
  },
  windowsSize: null,
  isMobile: false
});

const mutations = {
  setCheckedAfterLogin(state, payload) {
    state.checkedAfterLogin = payload;
  },
  setGlobalLoader(state, payload) {
    state.globalLoader = payload;
  },
  setTheme(state, payload) {
    console.log('payload', payload)
    state.theme = payload;
  },
  SET_MEDIA_QUERY_DETECTED(state, payload) {
    //console.log('STORE SET_MEDIA_QUERY_DETECTED');
    state.windowsSize = window.innerWidth;
    state.isMobile = payload === "mq-md" || payload === "mq-sm" ? true : false;
    state.mqType = payload;
  }
};

const actions = {};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
