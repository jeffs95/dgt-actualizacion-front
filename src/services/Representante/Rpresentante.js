import axiosInstance from '../../axiosConfig/axios';

export const postRepresentante = async (data) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/representante', {data}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const getRepresentante = async () => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/representante', config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const getByIdRepresentante = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/representante', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const putRepresentante = async (id, data) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put('/api/representante', {id}, data,  config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const deleteRepresentante = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.delete('/api/representante', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};