import { defineStore } from 'pinia'


export const userStore = defineStore('userStore', {
    state: () => ({
        token: '',
        user: {'role': 0},
        settings: {
            square: false
        }
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
        },
        isAdmin: (state) => {
            return state.user.role.id == 3 ? true : false;
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

