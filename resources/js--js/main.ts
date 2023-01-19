import "./bootstrap";
import { createApp } from "vue";
import store from "./store";
import router from "./router";
import ElementPlus from "element-plus";

import App from "./App.vue";
import "element-plus/theme-chalk/src/index.scss";

import 'remixicon/fonts/remixicon.css'

import VabTopBar from "@/components/VabTopBar/index.vue";
import VabTabsBar from "@/components/VabTabsBar/index.vue";
import VabSideBar from "@/components/VabSideBar/index.vue";

import VabAppMain from "@/layouts/components/VabAppMain/index.vue";
import VabNavBar from "@/layouts/components/VabNavBar/index.vue";
import VabLogo from "@/layouts/components/VabLogo/index.vue";
import VabSideBarItem from "@/components/VabSideBar/components/VabSideBarItem.vue";
import VabBreadcrumb from "@/layouts/components/VabBreadcrumb/index.vue";
import VabFullScreenBar from "@/components/VabFullScreenBar/index.vue";
import VabAvatar from "@/layouts/components/VabAvatar/index.vue";
import VabIcon from "@/components/VabIcon/index.vue";
import VabMenuItem from "@/components/VabSideBar/components/VabMenuItem.vue";


const app = createApp(App, {});
app.use(store);
app.use(router);
app.use(ElementPlus);
app.component("vab-top-bar", VabTopBar);
app.component("vab-tabs-bar", VabTabsBar);
app.component("vab-side-bar", VabSideBar);
app.component("vab-app-main", VabAppMain);
app.component("vab-nav-bar", VabNavBar);
app.component("vab-logo", VabLogo);
app.component("vab-side-bar-item", VabSideBarItem);
app.component("vab-breadcrumb", VabBreadcrumb);
app.component("vab-full-screen-bar", VabFullScreenBar);
app.component("vabmenuitem", VabMenuItem);
app.component("vab-menu-item", VabMenuItem);
// app.component("vab-theme-bar", VabThemeBar);
app.component("vab-icon", VabIcon);
app.component("vab-avatar", VabAvatar);
app.mount("#app");
