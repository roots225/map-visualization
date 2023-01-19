/**
 * @author https://vue-admin-beautiful.com
 * @description
 */

import { defineStore } from "pinia";

export default defineStore("tabsBar", {
    state: (): { _visitedRoutes: any[] } => ({
        _visitedRoutes: [],
    }),
    getters: {
        visitedRoutes: (state) => state._visitedRoutes,
    },
    actions: {
        addVisitedRoute(route: any) {
            let target = this.visitedRoutes.find(
                (item: any) => item.path === route.path
            );
            if (target) {
                if (route.fullPath !== target.fullPath)
                    Object.assign(target, route);
                return;
            }
            this.visitedRoutes.push(Object.assign({}, route));
        },
        async delRoute(route: any) {
            await this.delVisitedRoute(route);
            return {
                visitedRoutes: [...this.visitedRoutes],
            };
        },
        delVisitedRoute(route: any) {
            this.visitedRoutes.forEach((item, index) => {
                if (item.path === route.path)
                    this.visitedRoutes.splice(index, 1);
            });
            return [...this.visitedRoutes];
        },
        async delOthersRoutes(route: any) {
            const routes = await this.delOthersVisitedRoute(route);
            return {
                visitedRoutes: [...routes],
            };
        },
        async delLeftRoutes(route: any) {
            const routes = await this.delLeftVisitedRoute(route);
            return {
                visitedRoutes: [...routes],
            };
        },
        async delRightRoutes(route: any) {
            const routes = await this.delRightVisitedRoute(route);
            return {
                visitedRoutes: [...routes],
            };
        },
        delOthersVisitedRoute(route: any) {
            this._visitedRoutes = this._visitedRoutes.filter(
                (item) => item.meta.affix || item.path === route.path
            );
            return [...this._visitedRoutes];
        },
        delLeftVisitedRoute(route: any) {
            let index = this._visitedRoutes.length;
            this._visitedRoutes = this._visitedRoutes.filter((item) => {
                if (item.name === route.name)
                    index = this._visitedRoutes.indexOf(item);
                return (
                    item.meta.affix ||
                    index <= this._visitedRoutes.indexOf(item)
                );
            });
            return [...this._visitedRoutes];
        },
        delRightVisitedRoute(route: any) {
            let index = this._visitedRoutes.length;
            this._visitedRoutes = this._visitedRoutes.filter((item) => {
                if (item.name === route.name)
                    index = this._visitedRoutes.indexOf(item);
                return (
                    item.meta.affix ||
                    index >= this._visitedRoutes.indexOf(item)
                );
            });
            return [...this._visitedRoutes];
        },
        async delAllRoutes(route: any) {
            const routes = await this.delAllVisitedRoutes();
            return {
                visitedRoutes: [...routes],
            };
        },
        delAllVisitedRoutes() {
            this._visitedRoutes = this._visitedRoutes.filter(
                (item) => item.meta.affix
            );
            return [...this._visitedRoutes];
        },
        updateVisitedRoute(route: any) {
            this._visitedRoutes.forEach((item) => {
                if (item.path === route.path) item = Object.assign(item, route);
            });
        },
    },
});
