export type userStoreStateType = {
    _accessToken: string | null;
    _username: string;
    _avatar: string;
    _permissions: string[];
};

export type settingsStoreStateType = {
    _tabsBar: boolean;
    _logo: string;
    _collapse: boolean;
    _layout: string;
    _header: string;
    _device: string;
    _themeBar: boolean;
};

export interface routesStoreStateType {
    _routes: RouteRecord[];
    _partialRoutes: RouteRecord[];
}

export type themeType = {
    header: string;
    layout: string;
    themeBar: boolean;
    tabsBar: boolean;
};

export interface markerPoint {
    id: number;
    name: string;
    lat: number;
    lng: number;
}
