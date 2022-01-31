import {createSlice} from '@reduxjs/toolkit';

export const languageSelectorSlice = createSlice({
    name: 'language',
    initialState: {
        available: [
            {id: 'en', label: 'english'},
            {id: 'ru', label: 'русский'}
        ],
        current: 'ru',
    },
    reducers: {
        setAvailable: (state, action) => {  // TODO checks !!!
            state.available = action.payload;
        },
        setCurrent: (state, action) => { // TODO checks !!!
            state.current = action.payload;
        },
    },
});

export const {setCurrent, setAvailable} = languageSelectorSlice.actions;

export const currentLanguage = state => state.language.current;
export const availableLanguages = state => state.language.available;

export default languageSelectorSlice.reducer;
