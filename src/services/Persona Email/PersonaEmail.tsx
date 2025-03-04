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

export const getPersonaEmail = async (id: string): Promise<any | null> => {
    try {
        const response = await axiosInstance.get(`/api/persona_email/${id}/persona`, getAuthConfig());
        return response.data.email;
    } catch (error) {
        console.error("Error al obtener las direcciones de la persona:", error);
        return null;
    }
};

export const addPersonaEmail = async (personaId: string, data: Record<string, any>): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/api/persona_email/${personaId}/persona`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo agregar la dirección a la persona");
    }
};

export const updatePersonaEmail = async (direccionId: string): Promise<any> => {
    try {
        const response = await axiosInstance.put(`/api/persona_email/${direccionId}`, {}, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo actualizar la dirección");
    }
};

export const deletePersonaEmail = async (direccionId: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/api/persona_email/${direccionId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo eliminar la dirección");
    }
};
