import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Id, PostItemType} from "../../app/types";
import {postDislike, postLike, postWithId} from "./postsSlice";
import UserInfo from "../../components/forum/UserInfo/UserInfo";
import PostText from "../../components/forum/PostText";
import PostInfo from "../../components/forum/PostInfo";
import ReplyButton from "../../components/forum/ReplyButton";
import {useAppSelector} from "../../app/hooks";
import {currentUser, isUserAuthenticated} from "../currentUser/currentUserSlice";
import './Post.sass';

export type LikeDislike = 'likes' | 'dislikes';

export default function Post({id, onReply}: { id: Id, onReply: (id: Id) => void }) {
    const post: PostItemType = useSelector(state => postWithId(state, id));
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const dispatch = useDispatch();
    const user = useAppSelector(currentUser);

    const handleReply = () => {
        onReply(id);
    };

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

    // TODO move ReplyButton to PostInfo as child component
    return (
        <>
            <div className='post'>
                <UserInfo user={post.author}/>
                <PostText text={post.text}/>
            </div>
            <PostInfo post={post} onClick={likesClicked}/>
            {(isAuthenticated && !user.isBanned) ? <ReplyButton onClick={handleReply}/> : ''}
        </>
    );
}