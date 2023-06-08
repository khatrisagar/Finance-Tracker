import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// user pages
import userLogin from "@/pages/user/user-login.page.vue";
import userRegister from "@/pages/user/user-register.page.vue";

// transaction pages
import viewTransaction from "@/pages/transactions/view-transaction.page.vue";
import allTransaction from "@/pages/transactions/all-transactions.page.vue";
import transactionForm from "@/pages/transactions/transaction-form.page.vue";

// 404 page
import pageNotFound from "@/pages/common/page-not-found.page.vue";

// navaigation gaurds
import {
    authenticateUser,
    onUserAuthentication,
} from "@/router/route-gaurds/authenticateUser.route";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "userLogin",
        component: userLogin,
        beforeEnter: onUserAuthentication,
    },
    {
        path: "/register",
        name: "userRegister",
        component: userRegister,
        beforeEnter: onUserAuthentication,
    },
    {
        path: "/",
        name: "home",
        redirect: { name: "transactions" },
    },

    {
        path: "/transactions",
        name: "transactions",
        component: allTransaction,
        beforeEnter: authenticateUser,
    },
    {
        path: "/transactions/create",
        name: "createTransaction",
        component: transactionForm,
        beforeEnter: authenticateUser,
    },
    {
        path: "/transactions/edit/:transactionId",
        name: "editTransaction",
        component: transactionForm,
        beforeEnter: authenticateUser,
    },
    {
        path: "/transaction/:transactionId",
        name: "transaction",
        component: viewTransaction,
        beforeEnter: authenticateUser,
    },
    {
        name: "pageNotFound",
        path: "/:pageNotFound(.*)*",
        redirect: { name: "404" },
    },
    {
        name: "404",
        path: "/404",
        component: pageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
