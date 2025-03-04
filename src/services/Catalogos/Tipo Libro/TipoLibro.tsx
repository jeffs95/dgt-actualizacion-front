import axiosInstance from '../../../axiosConfig/axios';
import { getAccessToken } from "../../index";

const getAuthConfig = () => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No hay token de autenticación");
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

export const fetchTipoLibro = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get("/api/catalogo/tipo_libro", getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error al obtener el catálogo de estado civil:", error);
        throw new Error("No se pudo obtener el catálogo de estado civil");
    }
};