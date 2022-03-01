import { createStore } from "vuex";

export default createStore({
  state: {
    loginUserId: 0,
  },
  mutations: {
    //set方法
    setLoginUserId(state, loginUserId) {
      state.loginUserId = loginUserId;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getLoginUserId: (state) => state.loginUserId,
  },
});
