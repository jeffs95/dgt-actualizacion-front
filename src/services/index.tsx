import { reactLocalStorage } from "reactjs-localstorage";

export const getAccessToken = (): string | null => {
    const accessToken = reactLocalStorage.get("access_token");

    return typeof accessToken === "string" ? accessToken : null;
};
