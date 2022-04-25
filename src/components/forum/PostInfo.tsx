import React from 'react';
import {PostItemType} from "../../app/types";
import ShowCount from "./ShowCount";
import {clickable} from "../../app/clickable";


export default function PostInfo({post, onClick}: { post: PostItemType, onClick: (props: any) => void }) {
    const ClickableCount = clickable(ShowCount, onClick);
    return (
        <div className='main-forum-post__info'>
            <ClickableCount label='likes' count={post.likes} className='pad05 margin05'/>
            <ClickableCount label='dislikes' count={post.dislikes} className='pad05 margin05'/>
            <span>{`postedAt:${post.postedAt}`}</span>
        </div>
    );
}