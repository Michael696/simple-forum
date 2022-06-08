import {configureStore} from '@reduxjs/toolkit';
import forumsReducer from '../features/forumsList/forumsSlice';
import threadsReducer from '../features/threads/threadsSlice';
import postsReducer from '../features/post/postsSlice';
import languageReducer from '../features/languageSelector/languageSelectorSlice';
import onlineUsersReducer from '../features/onlineUsers/onlineUsersSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import registerReducer from "../features/registerUser/registerSlice";
import bannedUsersReducer from "../features/bannedUsers/bannedUsersSlice";

export const store = configureStore({
    reducer: {
        forums: forumsReducer,
        threads: threadsReducer,
        posts: postsReducer,
        language: languageReducer,
        onlineUsers: onlineUsersReducer,
        currentUser: currentUserReducer,
        register: registerReducer,
        bannedUsers: bannedUsersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
