import React from 'react';
import {PostItemType} from "../../app/types";
import ShowCount from "./ShowCount/ShowCount";
import {clickable} from "../../app/clickable";
import '../../features/post/Post.sass';

export default function PostInfo({post, onClick}: { post: PostItemType, onClick?: (props: any) => void}) {
    const ClickableCount = clickable(ShowCount, onClick);
    const className = (onClick ? 'counter_enabled ' : '') + 'pad05 margin05';
    return (
        <div className='post__info'>
            <ClickableCount label='likes' count={post.likes.length} className={className}/>
            <ClickableCount label='dislikes' count={post.dislikes.length} className={className}/>
            <span>{`postedAt:${post.postedAt}`}</span>
        </div>
    );
}