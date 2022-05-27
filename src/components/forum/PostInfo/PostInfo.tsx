import React from 'react';
import {PostItemType, User} from "../../../app/types";
import ShowCount from "../ShowCount/ShowCount";
import {clickable} from "../../../app/clickable";
import '../../../features/post/Post.sass';

export default function PostInfo({children, post, user, onClick}: { children?, post: PostItemType, user: User, onClick?: (props: any) => void }) {
    const ClickableCount = clickable(ShowCount, onClick);
    const alreadyLiked = post.likes.some(u => u.id === user.id);
    const alreadyDisliked = post.dislikes.some(u => u.id === user.id);
    const likesClassName = (onClick ? (alreadyLiked ? 'counter_clicked ' : 'counter_enabled ') : '') + 'pad05 margin05 border-round-025';
    const dislikesClassName = (onClick ? (alreadyDisliked ? 'counter_clicked ' : 'counter_enabled ') : '') + 'pad05 margin05 border-round-025';
    // TODO post likes/dislikes to backend
    return (
        <div className='post__controls border-1-left border-1-right border-1-top'>
            <span className='post__info_align-left margin1-left'>{children}</span>
            <span className='post__info_align-right margin1-right'>
                <ClickableCount label='likes' count={post.likes.length} className={likesClassName}/>
                <ClickableCount label='dislikes' count={post.dislikes.length} className={dislikesClassName}/>
                <span>{`postedAt:${post.postedAt}`}</span>
            </span>
        </div>
    );
}