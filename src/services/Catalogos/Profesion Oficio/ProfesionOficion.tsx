import axiosInstance from '../../../axiosConfig/axios';
import { getAccessToken } from "../../index";

const getAuthConfig = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        console.warn("Intento de acceso sin token. Verifica autenticación.");
        return null;
    }
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

interface ProfesionOficio {
    id: number;
    nombre: string;
}

export const fetchProfesionOficio = async (): Promise<ProfesionOficio[] | null> => {
    try {
        const config = getAuthConfig();
        if (!config) return null;

        const response = await axiosInstance.get<ProfesionOficio[]>('/api/catalogo/profesion_oficio', config);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el catálogo de profesión u oficio:", error);
        return null;
    }
};
