<template>
    <v-app>
        <appHeader />
        <v-content class="pt-4">
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import appHeader from "@/components/common/app-header.component.vue";

export default {
    components: {
        appHeader,
    },
};
</script>
