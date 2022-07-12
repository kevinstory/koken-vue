import { defineStore } from 'pinia'


export const userStore = defineStore('userStore', {
    state: () => ({
        token: '',
        user: {}
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.token;
        },
        getUser: (state) => {
            return state.user;
        },
        getToken: (state) => {
            return state.token;
        }
    },
    actions: {
        login: ({ commit, _dispatch }, { token, user }) => {
            this.state.token = token;
            this.state.user = user;
        },
        logout: ({ commit }) => {
            Object.assign(state, getDefaultState());
        }
    },
    persist: true

})

