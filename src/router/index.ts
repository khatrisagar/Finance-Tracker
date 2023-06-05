import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/pages/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import(/* webpackChunkName: "about" */ "@/pages/AboutView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
