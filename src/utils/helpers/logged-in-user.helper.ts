import store from "@/store";
import {
    getLoggedInUserFromLocalStorage,
    getUsersFromLocalStorage,
} from "@/services";

import { userInterface } from "@/interfaces";

export const setLoggedInUserToStore = () => {
    if (getLoggedInUserFromLocalStorage()?.id) {
        const user = getUsersFromLocalStorage().find(
            (user: userInterface) =>
                user.id === getLoggedInUserFromLocalStorage().id
        );
        store.dispatch("user/setLoggedInUserState", user);
    }
};
