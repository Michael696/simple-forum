import React from "react";
import {PostItemType} from "../../../app/types";
import Form from "react-bootstrap/cjs/Form";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCurrentUser} from "../../../features/currentUser/currentUserSlice";
import {selectIsUserBanned, setBan} from "../../../features/bannedUsers/bannedUsersSlice";
import {RootState} from "../../../app/store";

export default function AdminPostPanel({post}: { post: PostItemType }) {
    const user = useAppSelector(selectCurrentUser);
    const isBanned = useAppSelector((state: RootState) => selectIsUserBanned(state, post.author.id));
    const dispatch = useAppDispatch();

    const handleBanChange = async () => {
        if (isBanned) {
            dispatch(setBan({userId: post.author.id, ban: false}));
        } else {
            dispatch(setBan({userId: post.author.id, ban: true}));
        }
    };

    return (
        <div className='post__admin-panel'>
            {post.author.id !== user.id /* admin cannot ban himself */ ?
                (<Form.Check
                    type="switch"
                    id="custom-switch"
                    label={`${post.author.name} banned`}
                    checked={isBanned}
                    onChange={handleBanChange}
                />) : ''
            }
        </div>
    )
}