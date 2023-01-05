import { RouteRecord } from "vue-router";
// import AppLayout from "@/layouts/app-layout.vue";
import AppLayout from "@/layouts/index.vue";

const routes: RouteRecord[] = [
    {
        path: "/",
        component: AppLayout,
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/pages/home-page.vue"),
            },
        ],
    },
];

export default routes;
