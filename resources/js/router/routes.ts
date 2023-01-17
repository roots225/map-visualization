import { RouteRecord } from "vue-router";
// import AppLayout from "@/layouts/app-layout.vue";
import Layout from "@/layouts/index.vue";

const routes: RouteRecord[] = [
    {
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/pages/home-page.vue"),
            },
            {
                path: "/import",
                name: "import",
                component: () => import("@/pages/import-page.vue"),
            },
        ],
    },
];

export default routes;
