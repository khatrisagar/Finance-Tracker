export const userLoginValidation = {
    userEmailRules: [
        (value: string) => {
            if (value) return true;

            return "Email Should Not be Empty.";
        },
    ],
    userPasswordRules: [
        (value: string) => {
            if (value) return true;

            return "Pasword  Should Not be Empty.";
        },
    ],
};
