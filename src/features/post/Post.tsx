import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Id, PostItemType} from "../../app/types";
import {postWithId, postLike, postDislike} from "./postsSlice";
import UserInfo from "../../components/forum/UserInfo/UserInfo";
import PostText from "../../components/forum/PostText";
import PostInfo from "../../components/forum/PostInfo";
import ReplyButton from "../../components/forum/ReplyButton";
import {useAppSelector} from "../../app/hooks";
import {isUserAuthenticated, currentUser} from "../currentUser/currentUserSlice";
import {url} from "../../app/urls";
import {useNavigate} from "react-router";
import './Post.sass';

export type LikeDislike = 'likes' | 'dislikes';

export default function Post({id}: { id: Id }) {
    const navigate = useNavigate();
    const post: PostItemType = useSelector(state => postWithId(state, id));
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const dispatch = useDispatch();
    const user = useAppSelector(currentUser);

    const handleReply = () => {
        if (isAuthenticated) {
            console.log(`new reply for post ${id}`);
        } else {
            navigate(url.SIGN_IN);
        }
    };

    const likesClicked =
        isAuthenticated ?
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
            <PostInfo post={post} onClick={likesClicked}/>
            <ReplyButton onClick={handleReply}/>
        </>
    );
}