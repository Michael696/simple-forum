import { createSlice } from '@reduxjs/toolkit';

export const forumListSlice = createSlice({
    name: 'forumList',
    initialState: {
        value: [1,2,3],
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { set } = forumListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectForumList = state => state.forumList.value;

export default forumListSlice.reducer;
