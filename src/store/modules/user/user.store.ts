import { Commit } from "vuex";
import { userStateInterFace } from "@/interfaces";

export default {
    namespaced: true,
    state() {
        return {
            // users: [],
            isUserLoggedIn: false,
            loggedInUserId: null,
        };
    },
    mutations: {
        SET_LOGGED_IN_USER(state: userStateInterFace, userId: number) {
            state.loggedInUserId = userId;
            state.isUserLoggedIn = true;
        },
        SET_LOGOUT_IN_USER(state: userStateInterFace) {
            state.loggedInUserId = null;
            state.isUserLoggedIn = false;
        },
    },
    actions: {
        setLoggedInUserState({ commit }: { commit: Commit }, userId: number) {
            commit("SET_LOGGED_IN_USER", userId);
        },
        setLogoutUserState({ commit }: { commit: Commit }) {
            commit("SET_LOGOUT_IN_USER");
        },
    },
    getters: {
        getLoggedInUserState(state: userStateInterFace) {
            return {
                isUserLoggedIn: state.isUserLoggedIn,
                loggedInUserId: state.loggedInUserId,
            };
        },
    },
};
