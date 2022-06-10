import httpApi from './httpApi';
import {RegisterParams} from "../features/registerUser/registerSlice";
import {Id, UserCredentials} from "./types";

export const userApi = { // TODO decide whether userApi functions must throw or not
    auth: async (params: UserCredentials) => {
        let response;
        try {
            response = await httpApi.post('/auth', params);
            return response.data;
        } catch (e: any) {
            return {
                error: (e.response && e.response.data) ? e.response.data.error : e.message || 'unknown error'
            };
        }
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
    banUser: async (id: Id) => {
        try {
            await httpApi.post('/ban-user', {id});
            return true;
        } catch (e) {
            return false;
        }
    },
    unbanUser: async (id: Id) => {
        try {
            await httpApi.post('/unban-user', {id});
            return true;
        } catch (e) {
            return false;
        }
    },
    fetchBanned: async () => {
        try {
            const response = await httpApi.post('/get-banned', {});
            return response.data;
        } catch (e) {
            return false;
        }
    },
    register: async (params: RegisterParams) => {
        try {
            const response = await httpApi.post('/register', params);
            return response.data;
        } catch (e: any) {
            return {error: e.message}; // TODO pass error messages in other handlers
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
    fetchForums: async () => {
        try {
            const response = await httpApi.post('/forum-list');
            return response.data;
        } catch (e: any) {
            console.error(e);
            return {error: e.message}; // TODO pass error messages in other handlers
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
    fetchPosts: async ({id, start, end}: { id: Id, start: number, end: number }) => {
        try {
            const response = await httpApi.post('/posts', {id, start, end}); // thread id
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    addThreadViewCount: async (id: Id) => {
        try {
            const response = await httpApi.post('/add-thread-view-count', {id}); // thread id
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    createThread: async ({name, forumId, userId}: { name: string, forumId: Id, userId: Id }): Promise<{ id: Id } | false> => { // TODO add return types everywhere in userApi
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
    addPostLike: async ({postId}: { postId: Id }) => {
        try {
            const response = await httpApi.post('/add-post-like', {id: postId});
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    addPostDislike: async ({postId}: { postId: Id }) => {
        try {
            const response = await httpApi.post('/add-post-dislike', {id: postId});
            return response.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    getPostCount: async ({id}: { id: Id }) => {
        try {
            const response = await httpApi.post('/get-post-count', {id});
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