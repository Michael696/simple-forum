import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {currentUser, isUserAuthenticated} from "../../../features/currentUser/currentUserSlice";

export default function StatusHintMessage({children}) {
    const user = useAppSelector(currentUser);
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const hintMessage = isAuthenticated ? user.isBanned ? 'You are banned, you cannot write anything!' : '' : '\x20';
    return (
        <>
            {hintMessage.length > 0 ? hintMessage : children}
        </>
    );
}