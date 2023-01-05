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
        _routes: [],
        _partialRoutes: [],
    }),
    getters: {
        routes: (state: routesStoreStateType) => state._routes,
        partialRoutes: (state: routesStoreStateType) => state._partialRoutes,
    },
    actions: {
        async setRoutes(permissions: string[]) {
            const finallyAsyncRoutes = await filterAsyncRoutes([], permissions);
            this._routes = constantRoutes.concat([]);
            return this.routes;
        },
        async setAllRoutes() {
            let { data }: { data: any[] } = { data: [] };
            data.push({
                path: "*",
                redirect: "/404",
            });
            let accessRoutes = data;
            this._routes = constantRoutes.concat(accessRoutes);
            return accessRoutes;
        },
        setPartialRoutes(accessRoutes: RouteRecord[]) {
            this._partialRoutes = constantRoutes.concat(accessRoutes);
            return accessRoutes;
        },
    },
});
