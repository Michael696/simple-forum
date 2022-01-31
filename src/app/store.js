import {configureStore} from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

import forumListReducer from '../features/forumList/forumListSlice';

export default configureStore({
    reducer: {
        // counter: counterReducer,
        forumList: forumListReducer,
    },
});
