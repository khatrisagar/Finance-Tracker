export const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem("users");
    return users !== null ? JSON.parse(users) : [];
};
export const setUsersToLocalStorage = (users: Array<object>) => {
    localStorage.setItem("users", JSON.stringify(users));
};
