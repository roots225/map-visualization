import { defineStore } from "pinia";
import { userStoreStateType } from "@/types";
import { getAccessToken } from "@/utils/accessToken";

export default defineStore("user", {
    state: (): userStoreStateType => ({
        _accessToken: getAccessToken(),
        _username: "admin",
        _avatar: "",
        _permissions: [],
    }),
    getters: {
        accessToken: (state) => state._accessToken,
        username: (state) => state._username,
        avatar: (state) => state._avatar,
        permissions: (state) => state._permissions,
    },
    actions: {
        setPermissions(permissions: string[]) {
            this._permissions = permissions;
        },
        async login(userInfo: any) {
            /*
            const { data } = await login(userInfo);
            const accessToken = data[tokenName];
            if (accessToken) {
                this.accessToken = accessToken;
                const hour = new Date().getHours();
                const thisTime =
                    hour < 8
                        ? "早上好"
                        : hour <= 11
                        ? "上午好"
                        : hour <= 13
                        ? "中午好"
                        : hour < 18
                        ? "下午好"
                        : "晚上好";
                // Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`);
            } else {
                // Vue.prototype.$baseMessage(
                //     `登录接口异常，未正确返回${tokenName}...`,
                //     "error"
                // );
            }
            */
        },

        async getUserInfo() {
            /*
            const { data } = await getUserInfo(this.accessToken);
            if (!data) {
                // Vue.prototype.$baseMessage("验证失败，请重新登录...", "error");
                return false;
            }
            let { permissions, username, avatar } = data;
            if (permissions && username && Array.isArray(permissions)) {
                this.permissions = permissions;
                this.username = username;
                this.avatar = avatar;
                return permissions;
            } else {
                // Vue.prototype.$baseMessage("用户信息接口异常", "error");
                return false;
            }
            */
        },
        async logout() {
            // await logout(state.accessToken);
            // await dispatch("resetAccessToken");
            // await resetRouter();
        },
        resetAccessToken() {
            this._permissions = [];
            this._accessToken = "";
            // removeAccessToken();
        },
    },
});
