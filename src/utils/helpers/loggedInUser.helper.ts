import store from "@/store";
import { getLoggedInUserFromLocalStorage } from "@/services";

export const setLoggedInUserToStore = () => {
    store.dispatch(
        "user/setLoggedInUserState",
        getLoggedInUserFromLocalStorage().id
    );
};
