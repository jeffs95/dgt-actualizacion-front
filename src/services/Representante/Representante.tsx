import axiosInstance from '../../axiosConfig/axios';
import { getAccessToken } from "../../services/index";

const getAuthConfig = () => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No hay token de autenticación");
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

export const getRepresentantesByPersona = async (personaId: any) => {
    try {
        const response = await axiosInstance.get(`/api/representante/${personaId}/juridico`, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error('No se pudo obtener la lista de representantes.');
    }
};

export const postRepresentante = async (data: any) => {
    try {
        const response = await axiosInstance.post('/api/representante', data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error('No se completó la operación');
    }
};

export const getRepresentante = async () => {
    try {
        const response = await axiosInstance.get('/api/representante', getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error('No se completó la operación');
    }
};

export const getByIdRepresentante = async (id: any) => {
    try {
        const response = await axiosInstance.get(`/api/representante/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error('No se completó la operación');
    }
};

export const putRepresentante = async (id: any, data: any) => {
    try {
        const response = await axiosInstance.put(`/api/representante/${id}`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error('No se completó la operación');
    }
};

export const deleteRepresentante = async (id: any) => {
    try {
        const response = await axiosInstance.delete(`/api/representante/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error('No se completó la operación');
    }
};
