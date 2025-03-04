import { reactLocalStorage } from "reactjs-localstorage";
import axiosInstance from "../../axiosConfig/axios";
import { getAccessToken } from "../index";

interface LoginPayload {
    nit: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user_id: number;
}

export const loginUser = async ({ nit, password }: LoginPayload): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/api/authenticate", { nit, password });
        return response.data;
    } catch (error) {
        throw new Error("Credenciales inválidas");
    }
};

interface UserPersonaResponse {
    data: any;
    persona?: any;
}

export const fetchUserPersona = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) throw new Error("No hay token de autenticación");
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get<UserPersonaResponse>(`/api/persona`, config);
        return response.data;
    } catch (error) {
        console.error("[ERROR]", error);
        return null;
    }
};


interface LogoutResponse {
    message: string;
}

export const logout = async (id: number): Promise<LogoutResponse> => {
    try {
        const storedData = reactLocalStorage.getObject("auth") as { access_token?: string };
        const accessToken = storedData.access_token;

        if (!accessToken) throw new Error("No hay token de autenticación");

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post<LogoutResponse>("/api/logout", { id }, config);
        return response.data;
    } catch (error) {
        throw new Error("No se completó la operación");
    }
};
