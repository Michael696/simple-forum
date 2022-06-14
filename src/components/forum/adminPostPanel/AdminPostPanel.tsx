import React, {useCallback} from "react";
import {PostItemStateType} from "../../../app/types";
import Form from "react-bootstrap/cjs/Form";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCurrentUser} from "../../../features/currentUser/currentUserSlice";
import {selectIsUserBanned, setBan} from "../../../features/bannedUsers/bannedUsersSlice";
import {RootState} from "../../../app/store";

function AdminPostPanel({post}: { post: PostItemStateType }) {
    const user = useAppSelector(selectCurrentUser);
    const isBanned = useAppSelector((state: RootState) => selectIsUserBanned(state, post.author.id));
    const dispatch = useAppDispatch();

    const handleBanChange = useCallback(() => {
        if (isBanned) {
            dispatch(setBan({userId: post.author.id, ban: false}));
        } else {
            dispatch(setBan({userId: post.author.id, ban: true}));
        }
    }, [isBanned, post.author.id, dispatch]);

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

const AdminPostPanelWithMemo = React.memo(AdminPostPanel);
export default AdminPostPanelWithMemo;