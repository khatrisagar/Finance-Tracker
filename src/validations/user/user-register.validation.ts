export const userRegisterValidation = {
    userNameRules: [
        (value: string) => {
            if (value) return true;

            return "User Name Should Not be Empty.";
        },
    ],
    userEmailRules: [
        (value: string) => {
            if (value) return true;

            return "Email Should Not be Empty.";
        },
        (value: string) => {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

            return "Must be a valid e-mail.";
        },
    ],
    userPasswordRules: [
        (value: string) => {
            if (value) return true;

            return "Password Should Not be Empty.";
        },
        (value: string) => {
            if (value?.length > 8) return true;

            return "Password Should be greater than 8 Digits";
        },
    ],
};
