import React from 'react';
import {useSelector} from "react-redux";
import {Id, PostItemType} from "../../app/types";
import {postWithId} from "./postsSlice";
import UserInfo from "../../components/forum/UserInfo";
import PostText from "../../components/forum/PostText";

export default function Post({id}: { id: Id }) {
    const post: PostItemType = useSelector(state => postWithId(state, id));

    return (
        <div className='main-forum-post'>
            <UserInfo user={post.author}/>
            <PostText text={post.text}/>
        </div>
    );
}