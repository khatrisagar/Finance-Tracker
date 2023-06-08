import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";
import { getThemefromLocalStorage } from "@/services";

const lightTheme = {
    dark: false,
    colors: {
        primary: "#29B6F6",
        secondary: "#ffffff",
        "btn-text": "#000000",
    },
};

const darkTheme = {
    dark: true,
    colors: {
        primary: "#311B92",
        // secondary: "#000000",
        // "btn-text": "#ffffff",
    },
};

export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "fa",
        aliases,
        sets: {
            fa,
        },
    },
    theme: {
        defaultTheme: getThemefromLocalStorage() ?? "light",
        themes: {
            light: lightTheme,
            dark: darkTheme,
        },
    },
    defaults: {
        // vToolbar: {
        //     color: "primary",
        // },
    },
});
