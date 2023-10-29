import { createStore } from 'vuex'
// import example from './module-example'
import store from './store'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      store
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
