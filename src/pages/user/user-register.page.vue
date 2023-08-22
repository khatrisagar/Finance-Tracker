<template>
    <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent ref="form">
            <v-text-field
                v-model="userName"
                :rules="userRegisterValidation.userNameRules"
                label="Name"
            ></v-text-field>
            <v-text-field
                v-model="userEmail"
                :rules="userRegisterValidation.userEmailRules"
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
                :rules="userRegisterValidation.userPasswordRules"
                @click:append="togglePasswordVisisble = !togglePasswordVisisble"
            ></v-text-field>
            <v-btn type="submit" @click="onFormSubmit" block class="mt-2"
                >Register User</v-btn
            >
        </v-form>
        <v-container v-if="warning"
            ><p class="text-red">{{ warning }}</p></v-container
        >
    </v-sheet>
</template>

<script>
import { getUsersFromLocalStorage, setUsersToLocalStorage } from "@/services";
import { userRegisterValidation } from "@/validations";

export default {
    data() {
        return {
            togglePasswordVisisble: false,
            userName: null,

            userEmail: null,

            userPassword: null,
            warning: null,
        };
    },
    methods: {
        async onFormSubmit() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                let users = getUsersFromLocalStorage();
                const usersEmail = users.map((user) => user.email);
                if (!usersEmail.includes(this.userEmail)) {
                    users.push({
                        id: new Date().getTime(),
                        name: this.userName,
                        email: this.userEmail,
                        password: this.userPassword,
                        transactions: [],
                    });

                    setUsersToLocalStorage(users);

                    this.$router.push({ name: "userLogin" });
                } else {
                    this.warning = "User Already Exists";
                }
            }
        },
    },
    computed: {
        userRegisterValidation() {
            return userRegisterValidation;
        },
    },
};
</script>
