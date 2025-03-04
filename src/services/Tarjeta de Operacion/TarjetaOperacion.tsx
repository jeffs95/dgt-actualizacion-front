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

export const getTarjetasByLicencia = async (licenciaId: string): Promise<any | null> => {
    try {
        const response = await axiosInstance.get(`/api/tarjeta_operacion/${licenciaId}/licencia`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error al obtener las tarjetas de operación:", error);
        return null;
    }
};

export const addTarjetaOperacion = async (licenciaId: string, data: Record<string, any>): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/api/tarjeta_operacion/${licenciaId}/licencia`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo agregar la tarjeta de operación");
    }
};

export const deleteTarjetaOperacion = async (tarjetaId: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/api/tarjeta_operacion/${tarjetaId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        throw new Error("No se pudo eliminar la tarjeta de operación");
    }
};
