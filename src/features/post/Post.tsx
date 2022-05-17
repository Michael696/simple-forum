import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Id, PostItemType, ThreadItemType} from "../../app/types";
import {postDislike, postLike, postWithId} from "./postsSlice";
import UserInfo from "../../components/forum/UserInfo/UserInfo";
import PostText from "../../components/forum/PostText";
import PostInfo from "../../components/forum/PostInfo";
import {useAppSelector} from "../../app/hooks";
import {currentUser, isUserAuthenticated} from "../currentUser/currentUserSlice";
import AdminPostPanel from '../../components/forum/adminPostPanel/AdminPostPanel';
import './Post.sass';
import Button from "react-bootstrap/cjs/Button";

export type LikeDislike = 'likes' | 'dislikes';

const Post = function ({id, thread, onReply}: { id: Id, thread: ThreadItemType, onReply: (id: Id) => void }) {
    const post: PostItemType = useSelector(state => postWithId(state, id));
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const dispatch = useDispatch();
    const user = useAppSelector(currentUser);

    const handleReply = useCallback(() => {
        onReply(id);
    }, []);

    const handleRemove = useCallback(() => {
        console.log('remove post', id);
    }, []);

    const likesClicked =
        (isAuthenticated && !user.isBanned) ?
            (props: { label: LikeDislike }) => {
                switch (props.label) {
                    case 'likes':
                        dispatch(postLike({postId: id, user}));
                        break;
                    case 'dislikes':
                        dispatch(postDislike({postId: id, user}));
                        break;
                }
            }
            : undefined;

    return (
        <>
            <div className='post'>
                <UserInfo user={post.author}/>
                <PostText text={post.text}/>
            </div>
            <PostInfo post={post} onClick={likesClicked}>
                {(isAuthenticated && !user.isBanned) ? <Button onClick={handleReply}>reply</Button> : ''}
                {(isAuthenticated && !user.isBanned && user.id === post.author.id) ?
                    <Button onClick={handleRemove}>remove</Button> : ''
                }
                {(isAuthenticated && !user.isBanned && user.id === thread.author.id) ?
                    <Button onClick={handleRemove}>edit</Button> : ''
                }
            </PostInfo>
            {user.isAdmin ? <AdminPostPanel post={post}/> : ''}
        </>
    );
};

export default React.memo(Post);