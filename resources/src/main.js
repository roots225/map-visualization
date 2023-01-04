import "../js/bootstrap";
import { createApp } from "vue";
import App from "./App.vue";
// import store from "./store";
import router from "./router";
// import "./plugins";

import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/display.css";

// import "@/styles/element-variables.scss";
import "@/layouts/export";

// import "@/styles/vab.scss";
import "@/remixIcon";
import "@/colorfulIcon";
import "@/config/permission";
import "@/utils/errorLog";
import "@/plugins/vabIcon";
import VabPermissions from "zx-layouts/Permissions";
import Vab from "@/utils/vab";
import VabCount from "zx-count";

// if (process.env.NODE_ENV === "production") {
//     const { mockXHR } = require("@/utils/static");
//     mockXHR();
// }

// Vue.config.productionTip = false
const app = createApp(App, {});
// app.use(store);
app.use(router);
app.use(ElementUI);
app.use(Vab);
app.use(VabPermissions);
app.use(VabCount);
app.mount("#app");
