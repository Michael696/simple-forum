import React, {useState} from 'react';
import {PostItemStateType, User} from "../../../app/types";
import ShowCount from "../ShowCount/ShowCount";
import {clickable, hoverable} from "../../../app/hocs";
import '../../../features/post/Post.sass';
import './PostInfo.sass'
import {useAppSelector} from "../../../app/hooks";
import {selectPostDislikes, selectPostLikes} from "../../../features/post/postsSlice";
import {selectCurrentUser, selectIsUserAuthenticated} from "../../../features/currentUser/currentUserSlice";

function Popup({message, show}: { message: string, show: boolean }) {
    return show ? <div className='post-info__popup'>{message}</div> : null;
}

export default function PostInfo({children, post, user, onClick}: { children?: React.ReactNode, post: PostItemStateType, user: User, onClick: (props: any) => void }) {
    const [showLikesPopup, setShowLikesPopup] = useState(false);
    const [showDislikesPopup, setShowDislikesPopup] = useState(false);
    const likes = useAppSelector(state => selectPostLikes(state, post.id));
    const dislikes = useAppSelector(state => selectPostDislikes(state, post.id));
    const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
    const currentUser: User = useAppSelector(selectCurrentUser);
    const isUserEnabled = isAuthenticated && !currentUser.isBanned;
    let likeTimeout: number, dislikeTimeout: number;

    // TODO fix: popup is not always disappears when moving mouse out
    // TODO refactor switches and all 'Popup' stuff (don't like such implementation)
    const onEnter = (e: any) => {
        switch (e.label) {
            case 'likes':
                likeTimeout = window.setTimeout(() => {
                    setShowLikesPopup(true);
                }, 300);
                setShowDislikesPopup(false);
                break;
            case 'dislikes':
                dislikeTimeout = window.setTimeout(() => {
                    setShowDislikesPopup(true);
                }, 300);
                setShowLikesPopup(false);
                break;
        }
    };

    const onLeave = (e: any) => {
        switch (e.label) {
            case 'likes':
                clearTimeout(likeTimeout);
                setShowLikesPopup(false);
                break;
            case 'dislikes':
                clearTimeout(dislikeTimeout);
                setShowDislikesPopup(false);
                break;
        }
    };

    const SpecialCount = hoverable(clickable(ShowCount, isUserEnabled ? onClick : null), onEnter, onLeave);
    const alreadyLiked = likes.some(u => u.id === user.id);
    const alreadyDisliked = dislikes.some(u => u.id === user.id);

    const likesClassName = (isUserEnabled ? (alreadyLiked ? 'counter_clicked ' : 'counter_enabled ') : '') + 'pad05 margin05 border-round-025';
    const dislikesClassName = (isUserEnabled ? (alreadyDisliked ? 'counter_clicked ' : 'counter_enabled ') : '') + 'pad05 margin05 border-round-025';
    return (
        <div className='post__controls border-1-left border-1-right border-1-top'>
            <span className='post__info_block-left margin1-left'>{children}</span>
            <span className='post__info_block-right margin1-right'>
                <SpecialCount label='likes' count={likes.length} className={likesClassName}>
                    <Popup message={'liked by: ' + (likes.map(user => user.name).join(', ') || 'nobody')}
                           show={showLikesPopup}/>
                </SpecialCount>
                <SpecialCount label='dislikes' count={dislikes.length} className={dislikesClassName}>
                    <Popup message={'disliked by: ' + (dislikes.map(user => user.name).join(', ') || 'nobody')}
                           show={showDislikesPopup}/>
                </SpecialCount>
                <span>{`postedAt:${post.postedAt}`}</span>
            </span>
        </div>
    );
}