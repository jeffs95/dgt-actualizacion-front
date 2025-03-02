import axiosInstance from '../../axiosConfig/axios';

export const postPersona_documento = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/persona_documento', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const getPersona_documento = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/persona_documento', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const getByIdPersona_documento = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/persona_documento', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const putPersona_documento = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put('/api/persona_documento', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const deletePersona_documento = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.delete('/api/persona_documento', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};