export const getThemefromLocalStorage = () => {
    const theme = localStorage.getItem("theme");
    return theme !== null ? JSON.parse(theme) : "light";
};
export const setThemeToLocalStorage = (theme: string) => {
    localStorage.setItem("theme", JSON.stringify(theme));
};
