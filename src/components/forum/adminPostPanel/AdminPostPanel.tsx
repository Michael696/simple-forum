import React, {useState} from "react";
import {PostItemType} from "../../../app/types";
import Form from "react-bootstrap/cjs/Form";
import {useAppSelector} from "../../../app/hooks";
import {currentUser} from "../../../features/currentUser/currentUserSlice";
import {userApi} from "../../../app/userApi";

export default function AdminPostPanel({post}: { post: PostItemType }) {
    const user = useAppSelector(currentUser);
    const [isBanned, setBanned] = useState(post.author.isBanned);

    const handleBanChange = async () => { // TODO update banned user status in all posts
        if (isBanned) {
            const result = await userApi.unbanUser(post.author.id);
            if (result) {
                setBanned(false);
            }
        } else {
            const result = await userApi.banUser(post.author.id);
            if (result) {
                setBanned(true);
            }
        }
    };

    return (
        <div>
            {post.author.id !== user.id ?
                (<Form.Check
                    type="switch"
                    id="custom-switch"
                    label={`${post.author.name} banned`}
                    checked={isBanned}
                    onChange={handleBanChange}
                />) : ''
            }
            {JSON.stringify(post)}
        </div>
    )
}