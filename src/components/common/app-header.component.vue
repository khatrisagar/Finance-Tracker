<template>
    <v-toolbar color="primary" app>
        <v-toolbar-items class="hidden-xs-only">
            <router-link
                class="text-decoration-none d-flex align-items-center"
                :to="{ name: 'transactions' }"
            >
                <V-Btn class="font-weight-bold"> Transactions </V-Btn>
            </router-link>
            <router-link
                class="text-decoration-none d-flex align-items-center"
                :to="{ name: 'createTransaction' }"
            >
                <V-Btn class="font-weight-bold"> Add Transaction </V-Btn>
            </router-link>
        </v-toolbar-items>

        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!getLoggedInUserState.isUserLoggedIn">
            <router-link
                class="text-decoration-none d-flex align-items-center"
                :to="{ name: 'userLogin' }"
            >
                <V-Btn class="font-weight-bold">Login</V-Btn>
            </router-link>
            <router-link
                class="text-decoration-none d-flex align-items-center"
                :to="{ name: 'userRegister' }"
            >
                <V-Btn class="font-weight-bold"> SignUp </V-Btn>
            </router-link>
        </v-toolbar-items>
        <v-chip label v-if="getLoggedInUserState.isUserLoggedIn">{{
            getLoggedInUserState.userName
        }}</v-chip>
        <v-toolbar-items v-if="getLoggedInUserState.isUserLoggedIn">
            <V-btn @click="logoutUser">Logout</V-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            <v-switch v-model="currentTheme" @change="toggleTheme"></v-switch>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getThemefromLocalStorage, setThemeToLocalStorage } from "@/services";
export default {
    // mounted() {
    //     this.currentTheme = false;
    // },
    data() {
        return {
            currentTheme: null,
        };
    },
    computed: {
        ...mapGetters({
            getLoggedInUserState: "user/getLoggedInUserState",
        }),
    },
    methods: {
        ...mapActions({
            setLogoutUserState: "user/setLogoutUserState",
        }),
        logoutUser() {
            localStorage.removeItem("user_at");
            this.setLogoutUserState();
            this.$router.push({ name: "userLogin" });
        },
        toggleTheme() {
            const theme = getThemefromLocalStorage();
            if (theme === "dark") {
                setThemeToLocalStorage("light");
                this.$vuetify.theme.global.name = "light";
            } else if (theme === "light") {
                setThemeToLocalStorage("dark");
                this.$vuetify.theme.global.name = "dark";
            }
        },
    },
};
</script>
