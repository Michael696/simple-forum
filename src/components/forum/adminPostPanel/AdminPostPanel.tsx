import React from "react";
import {PostItemType} from "../../../app/types";
import Form from "react-bootstrap/cjs/Form";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {currentUser} from "../../../features/currentUser/currentUserSlice";
import {isUserBanned, setBan} from "../../../features/bannedUsers/bannedUsersSlice";
import {RootState} from "../../../app/store";

export default function AdminPostPanel({post}: { post: PostItemType }) {
    const user = useAppSelector(currentUser);
    const isBanned = useAppSelector((state: RootState) => isUserBanned(state, post.author.id));
    const dispatch = useAppDispatch();

    const handleBanChange = async () => { // TODO update banned user status in all posts
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