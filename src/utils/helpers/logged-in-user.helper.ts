import store from "@/store";
import { getLoggedInUserFromLocalStorage } from "@/services";

export const setLoggedInUserToStore = () => {
    if (getLoggedInUserFromLocalStorage().id) {
        store.dispatch(
            "user/setLoggedInUserState",
            getLoggedInUserFromLocalStorage().id
        );
    }
};
