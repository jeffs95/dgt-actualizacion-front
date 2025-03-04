import { getAccessToken } from "../index";
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

export const getLicenciasByPersona = async (personaId: string): Promise<any | null> => {
    try {
        const response = await axiosInstance.get(`/api/licencia/${personaId}/persona`, getAuthConfig());
        return response.data.licencia;
    } catch (error) {
        console.error("Error al obtener las licencias de la persona:", error);
        return null;
    }
};

export const addLicencia = async (personaId: string, data: Record<string, any>): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/api/licencia/${personaId}/persona`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo agregar la licencia");
    }
};

export const deleteLicencia = async (licenciaId: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/api/licencia/${licenciaId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo eliminar la licencia");
    }
};
