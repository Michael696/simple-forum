import {configureStore} from '@reduxjs/toolkit';

import forumsReducer from '../features/forums/forumsSlice';
import languageReducer from '../features/languageSelector/languageSelectorSlice';

export default configureStore({
    reducer: {
        forums: forumsReducer,
        language: languageReducer
    },
});
