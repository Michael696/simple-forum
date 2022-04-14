import httpApi from './httpApi';
import {RegisterParams} from "../features/registerUser/registerSlice";

export const userApi = {
    auth: async () => {
        try {
            const response = await httpApi.post('/online-users');
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    fetchOnline: async () => {
        try {
            const response = await httpApi.post('/online-users');
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    register: async (params: RegisterParams) => {
        try {
            return await httpApi.post('/register', params);
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};