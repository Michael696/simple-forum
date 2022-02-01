import {configureStore} from '@reduxjs/toolkit';

import forumsReducer from '../features/forums/forumsSlice';
import languageReducer from '../features/languageSelector/languageSelectorSlice';
import onlineUsersReducer from '../features/onlineUsers/onlineUsersSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';

export default configureStore({
    reducer: {
        forums: forumsReducer,
        language: languageReducer,
        onlineUsers: onlineUsersReducer,
        currentUser: currentUserReducer,
    },
});
