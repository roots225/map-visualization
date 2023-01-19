import defaultSettings from "@/config";

const { storage, tokenTableName } = defaultSettings;

/**
 * @author https://vue-admin-beautiful.com
 * @description get accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken() {
    if (storage) {
        if ("localStorage" === storage) {
            return localStorage.getItem(tokenTableName);
        } else if ("sessionStorage" === storage) {
            return sessionStorage.getItem(tokenTableName);
        } else {
            return localStorage.getItem(tokenTableName);
        }
    } else {
        return localStorage.getItem(tokenTableName);
    }
}

/**
 * @author https://vue-admin-beautiful.com
 * @description accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken: string) {
    if (storage) {
        if ("localStorage" === storage) {
            return localStorage.setItem(tokenTableName, accessToken);
        } else if ("sessionStorage" === storage) {
            return sessionStorage.setItem(tokenTableName, accessToken);
        } else {
            return localStorage.setItem(tokenTableName, accessToken);
        }
    } else {
        return localStorage.setItem(tokenTableName, accessToken);
    }
}

/**
 * @author https://vue-admin-beautiful.com
 * @description accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
    if (storage) {
        if ("localStorage" === storage) {
            return localStorage.removeItem(tokenTableName);
        } else if ("sessionStorage" === storage) {
            return sessionStorage.clear();
        } else {
            return localStorage.removeItem(tokenTableName);
        }
    } else {
        return localStorage.removeItem(tokenTableName);
    }
}
