import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import "@/styles/style.css";
import { vuetify } from "@/plugins";
import { setLoggedInUserToStore } from "@/utils";

setLoggedInUserToStore();

createApp(App).use(store).use(router).use(vuetify).mount("#app");
