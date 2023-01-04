/**
 * @author https://vue-admin-beautiful.com
 * @description
 */
import { defineStore } from "pinia";
import constantRoutes from "@/router/routes";
import { RouteRecord } from "vue-router";
// import { getRouterList } from '@/api/router'
import { filterAsyncRoutes } from "@/utils/handleRoutes";
import { routesStoreStateType } from "@/types";

export default defineStore("routes", {
    state: (): routesStoreStateType => ({
        routes: [],
        partialRoutes: [],
    }),
    getters: {
        routes: (state: routesStoreStateType) => state.routes,
        partialRoutes: (state: routesStoreStateType) => state.partialRoutes,
    },
    actions: {
        async setRoutes(permissions: string[]) {
            const finallyAsyncRoutes = await filterAsyncRoutes([], permissions);
            this.routes = constantRoutes.concat([]);
            return this.routes;
        },
        async setAllRoutes() {
            let { data }: { data: any[] } = { data: [] };
            data.push({
                path: "*",
                redirect: "/404",
            });
            let accessRoutes = data;
            this.routes = constantRoutes.concat(accessRoutes);
            return accessRoutes;
        },
        setPartialRoutes(accessRoutes: RouteRecord[]) {
            this.partialRoutes = constantRoutes.concat(accessRoutes);
            return accessRoutes;
        },
    },
});
