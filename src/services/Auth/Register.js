import axiosInstance from '../../axiosConfig/axios';

export const registerUser = async (data) => {
    try {        
        console.log('[data]', data);
        const response = await axiosInstance.post('/api/usuario', data);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};