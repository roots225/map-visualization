/**
 * @author https://vue-admin-beautiful.com
 * @description
 */
import { defineStore } from "pinia";
import defaultSettings from "@/config";
import { settingsStoreStateType } from "@/types";

const { tabsBar, logo, layout, header, themeBar } = defaultSettings;
let theme: any = "";
if (localStorage.getItem("vue-admin-beautiful-theme")) {
    theme = JSON.parse(localStorage.getItem("vue-admin-beautiful-theme") ?? "");
}

export default defineStore("settings", {
    state: (): settingsStoreStateType => ({
        _tabsBar: theme.tabsBar || tabsBar,
        _logo: logo,
        _collapse: false,
        _layout: theme.layout || layout,
        _header: theme.header || header,
        _device: "desktop",
        _themeBar: themeBar,
    }),
    getters: {
        collapse: (state: settingsStoreStateType) => state._collapse,
        device: (state: settingsStoreStateType) => state._device,
        header: (state: settingsStoreStateType) => state._header,
        layout: (state: settingsStoreStateType) => state._layout,
        logo: (state: settingsStoreStateType) => state._logo,
        tabsBar: (state: settingsStoreStateType) => state._tabsBar,
        themeBar: (state: settingsStoreStateType) => state._themeBar,
    },
    actions: {
        changeLayout(layout: string) {
            this._layout = layout;
        },
        changeHeader(header: string) {
            this._header = header;
        },
        changeTabsBar(tabsBar: boolean) {
            this._tabsBar = tabsBar;
        },
        changeCollapse() {
            this._collapse = !this._collapse;
        },
        foldSideBar() {
            this._collapse = true;
        },
        openSideBar() {
            this._collapse = false;
        },
        toggleDevice(device: string) {
            this._device = device;
        },
    },
});
