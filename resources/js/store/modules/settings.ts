/**
 * @author https://vue-admin-beautiful.com
 * @description
 */
import { defineStore } from "pinia";
import defaultSettings from "@/config";
import { settingsStoreStateType } from "@/types";

const { tabsBar, logo, layout, header, themeBar } = defaultSettings;
const theme =
    JSON.parse(localStorage.getItem("vue-admin-beautiful-theme") ?? "") || "";

export default defineStore("settings", {
    state: (): settingsStoreStateType => ({
        tabsBar: theme.tabsBar || tabsBar,
        logo,
        collapse: false,
        layout: theme.layout || layout,
        header: theme.header || header,
        device: "desktop",
        themeBar,
    }),
    getters: {
        collapse: (state: settingsStoreStateType) => state.collapse,
        device: (state: settingsStoreStateType) => state.device,
        header: (state: settingsStoreStateType) => state.header,
        layout: (state: settingsStoreStateType) => state.layout,
        logo: (state: settingsStoreStateType) => state.logo,
        tabsBar: (state: settingsStoreStateType) => state.tabsBar,
        themeBar: (state: settingsStoreStateType) => state.themeBar,
    },
    actions: {
        changeLayout(layout: string) {
            this.layout = layout;
        },
        changeHeader(header: string) {
            this.header = header;
        },
        changeTabsBar(tabsBar: boolean) {
            this.tabsBar = tabsBar;
        },
        changeCollapse() {
            this.collapse = !this.collapse;
        },
        foldSideBar() {
            this.collapse = true;
        },
        openSideBar() {
            this.collapse = false;
        },
        toggleDevice(device: string) {
            this.device = device;
        },
    },
});
