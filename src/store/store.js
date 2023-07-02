import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from "@/router";

const store = createStore({
  state: {
    currentUser: null,
    isLoggedIn: false,
    role: null,
    authToken: null,
    error: null,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setRole(state, role) {
      state.role = role;
    },
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async login({commit}, user) {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          const data = await response.json();
          commit('setCurrentUser', data.data.user);
          commit('setIsLoggedIn', true);
          commit('setRole', data.data.user.role);
          commit('setAuthToken', data.token);
          commit('setError', null);

          await router.push({name: 'Dashboard'});
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },

  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getRole: (state) => state.role,
    getAuthToken: (state) => state.authToken,
    getError: (state) => state.error,
    // ...other getters
  },
  // plugins: [createPersistedState({
  //   expires: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  // })],
});

export default store;
