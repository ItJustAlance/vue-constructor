import { createStore, createLogger } from "vuex";

import general from "./modules/general";
import auth from "./modules/auth";
import modals from "./modules/modals";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    general,
    auth,
    modals
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
