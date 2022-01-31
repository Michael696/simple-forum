import {configureStore} from '@reduxjs/toolkit';

import forumListReducer from '../features/forumList/forumListSlice';
import languageSelectorReducer from '../features/languageSelector/languageSelectorSlice';

export default configureStore({
    reducer: {
        forumList: forumListReducer,
        language: languageSelectorReducer
    },
});
