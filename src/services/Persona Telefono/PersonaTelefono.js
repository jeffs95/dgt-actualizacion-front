import axiosInstance from '../../axiosConfig/axios';

export const postPersonaTelefono = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/persona_telefono', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const getPersonaTelefono = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/persona_telefono', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const getByIdPersonaTelefono = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/persona_telefono', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const putPersonaTelefono = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put('/api/persona_telefono', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const deletePersonaTelefono = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.delete('/api/persona_telefono', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};