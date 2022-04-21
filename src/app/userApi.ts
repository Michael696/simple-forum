import httpApi from './httpApi';
import {RegisterParams} from "../features/registerUser/registerSlice";
import {Id} from "./types";

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
        const response = await httpApi.post('/register', params);
        if (response && response.data && response.data.error) {
            throw response.data.error;
        }
        return response.data;
    },
    fetchForums: async () => {
        try {
            const response = await httpApi.post('/forum-list');
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    fetchThreads: async (id: Id) => {
        try {
            const response = await httpApi.post('/threads', {id}); // forum id
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    fetchPosts: async (id: Id) => {
        try {
            const response = await httpApi.post('/posts', {id}); // thread id
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};