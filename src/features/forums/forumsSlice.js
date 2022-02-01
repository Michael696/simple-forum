import { createSlice } from '@reduxjs/toolkit';

export const forumsSlice = createSlice({
    name: 'forums',
    initialState: {
        value: [1,2,3],
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { set } = forumsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectForums = state => state.forums.value;

export default forumsSlice.reducer;
