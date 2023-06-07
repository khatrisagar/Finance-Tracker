export const getLoggedInUserFromLocalStorage = () => {
    const users = localStorage.getItem("user_at");
    return users !== null ? JSON.parse(users) : [];
};
