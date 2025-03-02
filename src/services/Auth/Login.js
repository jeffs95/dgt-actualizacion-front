import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../../axiosConfig/axios';

export const loginUser = async ({ nit, password }) => {
    try {
        const response = await axiosInstance.post('/api/authenticate', { nit, password });
        return response.data;
    } catch (error) {
        throw new Error('Credenciales inválidas');
    }
};

export const logout = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/logout', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

