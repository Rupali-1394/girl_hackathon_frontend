import axios from 'axios';

const API_URL = "https://google-backend-zixm.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const calculateTax = async (taxData) => {
    try {
        const response = await api.post('/tax/calculate', taxData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};