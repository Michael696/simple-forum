import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {currentUser, isUserAuthenticated} from "../../../features/currentUser/currentUserSlice";

export default function StatusHintMessage({children}) {
    const user = useAppSelector(currentUser);
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    return (
        <>
            {(isAuthenticated && user.isBanned) ?
                <div className='error-message center bold margin05'>You are banned! You cannot write, edit or remove
                    anything!</div>
                : children
            }
        </>
    );
}