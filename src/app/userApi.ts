import httpApi from './httpApi';
import {RegisterParams} from "../features/registerUser/registerSlice";
import {Id, UserCredentials} from "./types";

export const userApi = {
    auth: async (params: UserCredentials) => {
        const response = await httpApi.post('/auth', params);
        if (response && response.data && response.data.error) {
            throw response.data.error;
        }
        return response.data;
    },
    currentUser: async () => {
        const response = await httpApi.post('/current-user', {});
        if (response && response.data && response.data.error) {
            throw response.data.error;
        }
        return response.data;
    },
    deAuth: async () => {
        try {
            await httpApi.post('/deauth');
            return true;
        } catch (e) {
            return false;
        }
    },
    banUser: async (id) => {
        try {
            await httpApi.post('/ban-user', {id});
            return true;
        } catch (e) {
            return false;
        }
    },
    unbanUser: async (id) => {
        try {
            await httpApi.post('/unban-user', {id});
            return true;
        } catch (e) {
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
    fetchOnline: async () => {
        try {
            const response = await httpApi.post('/online-users');
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
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
    },
    addThreadViewCount: async (id: Id) => {
        try {
            const response = await httpApi.post('/add-threadViewCount', {id}); // thread id
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    createThread: async ({name, forumId, userId}: { name: string, forumId: Id, userId: Id }) => {
        try {
            const response = await httpApi.post('/create-thread', {title: name, forumId, author: userId});
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    createPost: async ({text, forumId, threadId, userId}: { text: string, forumId: Id, threadId: Id, userId: Id }) => {
        try {
            const response = await httpApi.post('/create-post', {text, forumId, threadId, author: userId});
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    setPostText: async ({text, postId}: { text: string, postId: Id }) => {
        try {
            const response = await httpApi.post('/set-post-text', {text, id: postId});
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    removePost: async ({id}: { id: Id }) => {
        try {
            const response = await httpApi.post('/remove-post', {id});
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    removeThread: async (id: Id) => {
        try {
            const response = await httpApi.post('/remove-thread', {id});
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};