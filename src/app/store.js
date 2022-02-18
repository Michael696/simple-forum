import {configureStore} from '@reduxjs/toolkit';
import {exampleMiddleware} from './middleware';
import forumsReducer from '../features/forums/forumsSlice';
import languageReducer from '../features/languageSelector/languageSelectorSlice';
import onlineUsersReducer from '../features/onlineUsers/onlineUsersSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';

import {baseApi} from './onlineUsersApi';
// import {useExampleQuery} from './extendedApi';

console.log('baseApi:', baseApi);
// console.log('baseApi.reducerPath:', baseApi.reducerPath);
// console.log('useExampleQuery:', useExampleQuery);
// Redux integration
// reducerPath: string
// reducer: Reducer
// middleware: Middleware

export default configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        forums: forumsReducer,
        language: languageReducer,
        onlineUsers: onlineUsersReducer,
        currentUser: currentUserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([exampleMiddleware,baseApi.middleware]),
});
