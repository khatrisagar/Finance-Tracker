import { Commit } from "vuex";
import { userStateInterFace, userInterface } from "@/interfaces";

export default {
    namespaced: true,
    state() {
        return {
            isUserLoggedIn: false,
            loggedInUserId: null,
            userName: null,
        };
    },
    mutations: {
        SET_LOGGED_IN_USER(state: userStateInterFace, user: userInterface) {
            state.loggedInUserId = user.id;
            state.isUserLoggedIn = true;
            state.userName = user.name;
        },
        SET_LOGOUT_IN_USER(state: userStateInterFace) {
            state.loggedInUserId = null;
            state.isUserLoggedIn = false;
            state.userName = null;
        },
    },
    actions: {
        setLoggedInUserState(
            { commit }: { commit: Commit },
            user: userInterface
        ) {
            commit("SET_LOGGED_IN_USER", user);
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
                userName: state.userName,
            };
        },
    },
};
