import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectCurrentUser, selectIsUserAuthenticated} from "../../../features/currentUser/currentUserSlice";

export default function StatusHintMessage({children}) {
    const user = useAppSelector(selectCurrentUser);
    const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
    let hintMessage = <></>;
    if (isAuthenticated) {
        if (user.isBanned) {
            hintMessage =
                <div className='error-message center bold margin05'>
                    You are banned! You cannot write, edit or remove anything!
                </div>
        } else {
            hintMessage = <>{children}</>;
        }
    }
    return hintMessage;
}