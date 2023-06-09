<template>
    <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent ref="form">
            <v-text-field
                v-model="userName"
                :rules="userNameRules"
                label="Name"
            ></v-text-field>
            <v-text-field
                v-model="userEmail"
                :rules="userEmailRules"
                label="Email"
            ></v-text-field>
            <v-text-field
                v-model="userPassword"
                label="password"
                :append-icon="
                    togglePasswordVisisble
                        ? 'fa-solid fa-eye'
                        : 'fa-solid fa-eye-slash'
                "
                :type="togglePasswordVisisble ? 'text' : 'password'"
                :rules="userPasswordRules"
                @click:append="togglePasswordVisisble = !togglePasswordVisisble"
            ></v-text-field>
            <v-btn type="submit" @click="onFormSubmit" block class="mt-2"
                >Register User</v-btn
            >
        </v-form>
    </v-sheet>
</template>

<script>
import { getUsersFromLocalStorage, setUsersToLocalStorage } from "@/services";

export default {
    data() {
        return {
            togglePasswordVisisble: false,
            userName: null,
            userNameRules: [
                (value) => {
                    if (value) return true;

                    return "User Name Should Not be Empty.";
                },
            ],
            userEmail: null,
            userEmailRules: [
                (value) => {
                    if (value) return true;

                    return "Email Should Not be Empty.";
                },
                (value) => {
                    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

                    return "Must be a valid e-mail.";
                },
            ],
            userPassword: null,
            userPasswordRules: [
                (value) => {
                    if (value) return true;

                    return "Password Should Not be Empty.";
                },
                (value) => {
                    if (value?.length > 8) return true;

                    return "Password Should be greater than 8 Digits";
                },
            ],
        };
    },
    methods: {
        async onFormSubmit() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                let users = getUsersFromLocalStorage();
                users.push({
                    id: new Date().getTime(),
                    name: this.userName,
                    email: this.userEmail,
                    password: this.userPassword,
                    transactions: [],
                });
                setUsersToLocalStorage(users);

                this.$router.push({ name: "userLogin" });
            }
        },
    },
};
</script>
