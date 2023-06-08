export const getLoggedInUserFromLocalStorage = () => {
    const users = localStorage.getItem("user_at");
    return users !== null ? JSON.parse(users) : [];
};

export const setLoggedInUserToLocalStorage = (user: object) => {
    localStorage.setItem("user_at", JSON.stringify(user));
};
