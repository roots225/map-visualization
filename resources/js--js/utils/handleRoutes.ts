import { RouteRecord, RouteRecordRaw } from "vue-router";

/**
 * @author https://vue-admin-beautiful.com
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
// export function convertRouter(asyncRoutes: any[]) {
//     return asyncRoutes.map((route) => {
//         if (route.component) {
//             if (route.component === "Layout") {
//                 route.component = (resolve) => require(["@/layouts"], resolve);
//             } else if (route.component === "EmptyLayout") {
//                 route.component = (resolve) =>
//                     require(["@/layouts/EmptyLayout"], resolve);
//             } else {
//                 const index = route.component.indexOf("views");
//                 const path =
//                     index > 0
//                         ? route.component.slice(index)
//                         : `views/${route.component}`;
//                 route.component = (resolve) => require([`@/${path}`], resolve);
//             }
//         }
//         if (route.children && route.children.length)
//             route.children = convertRouter(route.children);
//         if (route.children && route.children.length === 0)
//             delete route.children;
//         return route;
//     });
// }

/**
 * @author https://vue-admin-beautiful.com
 * @description
 * @param permissions
 * @param route
 * @returns {boolean|*}
 */
function hasPermission(permissions, route) {
    if (route.meta && route.meta.permissions) {
        return permissions.some((role) =>
            route.meta.permissions.includes(role)
        );
    } else {
        return true;
    }
}

/**
 * @author https://vue-admin-beautiful.com
 * @description
 * @param routes
 * @param permissions
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, permissions) {
    const finallyRoutes = [];
    routes.forEach((route) => {
        const item = { ...route };
        if (hasPermission(permissions, item)) {
            if (item.children) {
                item.children = filterAsyncRoutes(item.children, permissions);
            }
            finallyRoutes.push(item);
        }
    });
    return finallyRoutes;
}
