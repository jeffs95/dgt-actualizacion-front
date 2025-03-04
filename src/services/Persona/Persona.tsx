import { getAccessToken } from "../../services/index";
import axiosInstance from "../../axiosConfig/axios";

const getAuthConfig = () => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No hay token de autenticación");
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

export const fetchUserPersona = async (userId: string): Promise<any | null> => {
    try {
        const response = await axiosInstance.get(`/api/persona/${userId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error al verificar datos personales:", error);
        return null;
    }
};

export const getPersona = async (personaId: string): Promise<any | null> => {
    try {
        const response = await axiosInstance.get(`/api/persona/${personaId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos de la persona:", error);
        return null;
    }
};

export const saveNatural = async (data: Record<string, any>): Promise<any> => {
    try {
        const response = await axiosInstance.post("/api/persona/natural", data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo guardar la persona natural");
    }
};

export const saveJuridico = async (data: Record<string, any>): Promise<any> => {
    try {
        const response = await axiosInstance.post("/api/persona/juridico", data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo guardar la persona jurídica");
    }
};

export const updateNatural = async (naturalId: string, data: Record<string, any>): Promise<any> => {
    try {
        const response = await axiosInstance.put(`/api/persona/${naturalId}/natural`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo actualizar la persona natural");
    }
};

export const updateJuridico = async (juridicoId: string, data: Record<string, any>): Promise<any> => {
    try {
        const response = await axiosInstance.put(`/api/persona/${juridicoId}/juridico`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo actualizar la persona jurídica");
    }
};
