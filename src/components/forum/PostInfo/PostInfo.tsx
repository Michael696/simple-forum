import React from 'react';
import {PostItemType, User} from "../../../app/types";
import ShowCount from "../ShowCount/ShowCount";
import {clickable} from "../../../app/clickable";
import '../../../features/post/Post.sass';

export default function PostInfo({children, post, user, onClick}: { children?, post: PostItemType, user: User, onClick?: (props: any) => void }) {
    const ClickableCount = clickable(ShowCount, onClick); // TODO add ability to remove like/dislike
    const alreadyLiked = post.likes.some(u => u.id === user.id);
    const alreadyDisliked = post.dislikes.some(u => u.id === user.id);
    const likesClassName = (onClick ? (alreadyLiked ? 'counter_clicked ' : 'counter_enabled ') : '') + 'pad05 margin05';
    const dislikesClassName = (onClick ? (alreadyDisliked ? 'counter_clicked ' : 'counter_enabled ') : '') + 'pad05 margin05';
    // TODO do some makeup
    return (
        <div className='post__info'>
            <span>{children}</span>
            <span>
                <ClickableCount label='likes' count={post.likes.length} className={likesClassName}/>
                <ClickableCount label='dislikes' count={post.dislikes.length} className={dislikesClassName}/>
                <span>{`postedAt:${post.postedAt}`}</span>
            </span>
        </div>
    );
}