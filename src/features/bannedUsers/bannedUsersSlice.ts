import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {Id} from "../../app/types";
import {debug} from "../../app/debug";
import {userApi} from "../../app/userApi";

type BannedUsersStateType = {
    list: Array<Id>
}

const initialState: BannedUsersStateType = {
    list: []
};

export const bannedUsersSlice = createSlice({
    name: 'bannedUsers',
    initialState,
    reducers: { // in somewhat duplicate slice of state !? (also in user.isBanned)
        setAll: (state: BannedUsersStateType, action: PayloadAction<Array<Id>>) => {
            state.list = action.payload;
        },
        banUser: (state: BannedUsersStateType, action: PayloadAction<Id>) => {
            const alreadyBanned = state.list.findIndex(banned => banned === action.payload);
            if (!~alreadyBanned) {
                state.list.push(action.payload);
            }
        },
        unbanUser: (state: BannedUsersStateType, action: PayloadAction<Id>) => {
            state.list = state.list.filter(banned => banned !== action.payload);
        },
    }
});

export const selectIsUserBanned = (state: RootState, id: Id) => !!~state.bannedUsers.list.findIndex(banned => banned === id);

const {setAll, banUser, unbanUser} = bannedUsersSlice.actions;

export const fetchBanned = () => async (dispatch: AppDispatch) => {
    debug('fetch banned');
    const banned: Array<Id> = await userApi.fetchBanned();
    if (banned) {
        dispatch(setAll(banned));
    }
};

export const setBan = ({userId, ban}: { userId: Id, ban: boolean }) => async (dispatch: AppDispatch) => {
    if (ban) {
        await userApi.banUser(userId) && dispatch(banUser(userId));
    } else {
        await userApi.unbanUser(userId) && dispatch(unbanUser(userId));
    }
};

export default bannedUsersSlice.reducer;