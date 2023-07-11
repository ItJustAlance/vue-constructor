import { createStore, createLogger } from 'vuex'

import todos from "./modules/todos";


const debug = process.env.NODE_ENV !== 'production'


export default createStore({
  modules: {
    todos
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
