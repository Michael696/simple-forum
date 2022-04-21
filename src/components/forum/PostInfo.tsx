import React from 'react';
import {PostItemType} from "../../app/types";

export default function PostInfo({post}: { post: PostItemType }) {
    return (
        <div className='main-forum-post__info'>
            <span>{`likes:${post.likes}`}</span>
            <span>{`dislikes:${post.dislikes}`}</span>
            <span>{`postedAt:${post.postedAt}`}</span>
        </div>
    );
}