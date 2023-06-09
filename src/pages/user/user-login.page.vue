<template>
    <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent ref="form">
            <v-text-field
                v-model="userEmail"
                :rules="userEmailRules"
                label="Email"
            ></v-text-field>
            <v-text-field
                v-model="userPassword"
                :append-icon="
                    togglePasswordVisisble
                        ? 'fa-solid fa-eye'
                        : 'fa-solid fa-eye-slash'
                "
                :type="togglePasswordVisisble ? 'text' : 'password'"
                :rules="userPasswordRules"
                label="password"
                @click:append="togglePasswordVisisble = !togglePasswordVisisble"
            ></v-text-field>

            <p v-if="showLoginError" class="text-red">
                Invalid Email Or Password
            </p>
            <v-btn type="submit" @click="onFormSubmit" block class="mt-2"
                >Login User</v-btn
            >
        </v-form>
    </v-sheet>
</template>

<script>
import { setLoggedInUserToStore } from "@/utils";
import {
    getUsersFromLocalStorage,
    setLoggedInUserToLocalStorage,
} from "@/services";
export default {
    data() {
        return {
            togglePasswordVisisble: false,
            userEmail: null,
            userEmailRules: [
                (value) => {
                    if (value) return true;

                    return "Email Should Not be Empty.";
                },
            ],
            userPassword: null,
            userPasswordRules: [
                (value) => {
                    if (value) return true;

                    return "Pasword  Should Not be Empty.";
                },
            ],
            showLoginError: false,
        };
    },
    methods: {
        async onFormSubmit() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                const users = getUsersFromLocalStorage();
                if (users.length) {
                    for (let user of users) {
                        if (
                            user.email === this.userEmail &&
                            user.password === this.userPassword
                        ) {
                            setLoggedInUserToLocalStorage({ id: user.id });

                            setLoggedInUserToStore();
                            this.$router.push({ name: "transactions" });
                        } else {
                            this.showLoginError = true;
                        }
                    }
                } else {
                    this.showLoginError = true;
                }
            }
        },
    },
};
</script>
