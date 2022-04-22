import React from 'react';
import {useSelector} from "react-redux";
import {Id, PostItemType} from "../../app/types";
import {postWithId} from "./postsSlice";
import UserInfo from "../../components/forum/UserInfo";
import PostText from "../../components/forum/PostText";
import PostInfo from "../../components/forum/PostInfo";
import ReplyButton from "../../components/forum/ReplyButton";
import {useAppSelector} from "../../app/hooks";
import {isUserAuthenticated} from "../currentUser/currentUserSlice";
import {url} from "../../app/urls";
import {useNavigate} from "react-router";


export default function Post({id}: { id: Id }) {
    const navigate = useNavigate();
    const post: PostItemType = useSelector(state => postWithId(state, id));
    const isAuthenticated = useAppSelector(isUserAuthenticated);

    const handleReply = () => {
        if (isAuthenticated) {
            console.log(`new reply for post ${id}`);
        } else {
            navigate(url.SIGN_IN);
        }
    };

    return (
        <>
            <div className='main-forum-post'>
                <UserInfo user={post.author}/>
                <PostText text={post.text}/>
            </div>
            <PostInfo post={post}/>
            <ReplyButton onClick={handleReply}/>
        </>
    );
}