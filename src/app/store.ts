import {configureStore} from '@reduxjs/toolkit';
// import {exampleMiddleware} from './middleware';
import forumsReducer from '../features/forums/forumsSlice';
import languageReducer from '../features/languageSelector/languageSelectorSlice';
import onlineUsersReducer from '../features/onlineUsers/onlineUsersSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
// import  { authApi }  from './services/auth'

// import {onlineUsersApi} from './onlineUsersApi';
// import {authUserApi} from './authUserApi';
// import {useExampleQuery} from './extendedApi';

// console.log('onlineUsersApi:', onlineUsersApi);
// console.log('onlineUsersApi.reducerPath:', onlineUsersApi.reducerPath);

// console.log('authUserApi:', authUserApi);
// console.log('authUserApi.reducerPath:', authUserApi.reducerPath);
// console.log('useExampleQuery:', useExampleQuery);


export const store = configureStore({
    reducer: {
        // [onlineUsersApi.reducerPath]: onlineUsersApi.reducer,
        // [authUserApi.reducerPath]: authUserApi.reducer,
        // [authApi.reducerPath]: authApi.reducer,
        forums: forumsReducer,
        language: languageReducer,
        onlineUsers: onlineUsersReducer,
        currentUser: currentUserReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([exampleMiddleware,onlineUsersApi.middleware]),
});

// @ts-ignore
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
