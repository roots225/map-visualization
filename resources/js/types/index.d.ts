export type userStoreStateType = {
    accessToken: string | null;
    username: string;
    avatar: string;
    permissions: string[];
};

export type settingsStoreStateType = {
    tabsBar: boolean;
    logo: string;
    collapse: boolean;
    layout: string;
    header: string;
    device: string;
    themeBar: boolean;
};

export interface routesStoreStateType {
    routes: RouteRecord[];
    partialRoutes: RouteRecord[];
}

export type themeType = {
    header: string;
    layout: string;
    themeBar: boolean;
    tabsBar: boolean;
};
