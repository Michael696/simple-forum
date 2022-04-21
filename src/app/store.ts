import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {exampleMiddleware} from './middleware';
import forumsReducer from '../features/forumsList/forumsSlice';
import threadsReducer from '../features/threads/threadsSlice';
import postsReducer from '../features/post/postsSlice';
import languageReducer from '../features/languageSelector/languageSelectorSlice';
import onlineUsersReducer from '../features/onlineUsers/onlineUsersSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import registerReducer from "../features/registerUser/registerSlice";
// import  { authApi }  from './services/auth'
import rootSaga from "./sagas";

// import {onlineUsersApi} from './onlineUsersApi';
// import {authUserApi} from './authUserApi';
// import {useExampleQuery} from './extendedApi';

// console.log('onlineUsersApi:', onlineUsersApi);
// console.log('onlineUsersApi.reducerPath:', onlineUsersApi.reducerPath);

// console.log('authUserApi:', authUserApi);
// console.log('authUserApi.reducerPath:', authUserApi.reducerPath);
// console.log('useExampleQuery:', useExampleQuery);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        // [onlineUsersApi.reducerPath]: onlineUsersApi.reducer,
        // [authUserApi.reducerPath]: authUserApi.reducer,
        // [authApi.reducerPath]: authApi.reducer,
        forums: forumsReducer,
        threads: threadsReducer,
        posts: postsReducer,
        language: languageReducer,
        onlineUsers: onlineUsersReducer,
        currentUser: currentUserReducer,
        register: registerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
