export const getUsers = () => {
    const users = localStorage.getItem("users");
    return users !== null ? JSON.parse(users) : [];
};
export const setUsers = (users: Array<object>) => {
    localStorage.setItem("users", JSON.stringify(users));
};
