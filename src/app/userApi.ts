import httpApi from './httpApi';

export const userApi = {
    auth: async ()=>{
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
    }
};