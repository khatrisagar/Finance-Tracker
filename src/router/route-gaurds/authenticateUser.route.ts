import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export const authenticateUser = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const userToken = localStorage.getItem("user_at");
    if (userToken) {
        next();
    } else {
        next({ name: "userLogin" });
    }
};
