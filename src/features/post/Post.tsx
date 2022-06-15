import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Id, PostItemType, User} from "../../app/types";
import {
    addPostDislike,
    addPostLike,
    fetchPosts,
    fetchPostWithId,
    removePost,
    selectPostWithId,
    setPostText
} from "./postsSlice";
import UserInfo from "../../components/forum/UserInfo/UserInfo";
import PostText from "../../components/forum/PostText/PostText";
import PostInfo from "../../components/forum/PostInfo/PostInfo";
import {useAppSelector} from "../../app/hooks";
import {selectCurrentUser, selectIsUserAuthenticated} from "../currentUser/currentUserSlice";
import AdminPostPanel from '../../components/forum/adminPostPanel/AdminPostPanel';
import './Post.sass';
import Button from "react-bootstrap/cjs/Button";
import {useParams} from "react-router-dom";
import {RootState} from "../../app/store";
import {debug} from "../../app/helpers";
import Confirmation from "../../components/main/Confirmation/Confirmation";

export type LikeDislike = 'likes' | 'dislikes';

const Post = function ({id, threadId, onReply}: { id: Id, threadId: Id, onReply: (post: PostItemType) => void }) {
        const params = useParams();
        const post: PostItemType = useSelector((state: RootState) => selectPostWithId(state, id));
        const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
        const dispatch = useDispatch();
        const user: User = useAppSelector(selectCurrentUser);
        const [editable, setEditable] = useState(false);
        const [confirmationShown, setConfirmationShown] = useState(false);

        useEffect(() => {
            dispatch(fetchPostWithId({id}));
        }, [dispatch, id]);

        const handleReply = useCallback(() => {
            onReply(post);
        }, [onReply, post]);

        const removeCurrentPost = useCallback(() => {
            setConfirmationShown(false);
            debug('remove post', id);
            dispatch(removePost(id));
            dispatch(fetchPosts({page: parseInt(params.page || '1', 10), threadId}, true));
        }, [id, params.page, threadId, dispatch]);

        const handleRemove = useCallback(() => {
            setConfirmationShown(true);
        }, []);

        const handleEdit = useCallback(() => {
            setEditable(true);
        }, []);

        const handleReject = useCallback(() => {
            setConfirmationShown(false);
        }, []);

        const editCancel = useCallback(() => {
            setEditable(false);
        }, []);

        const editSave = useCallback((text: string) => {
            setEditable(false);
            debug(`setting post ${post.id} text:`, text);
            dispatch(setPostText(post.id, text));
        }, [post, dispatch]);

        const MAX_SHORT_LENGTH = 80;
        const postShortText = post.text.length > MAX_SHORT_LENGTH ? post.text.substring(0, MAX_SHORT_LENGTH) + '...' : post.text;
        // TODO friendly format the message
        const confirmationText = `You are about to remove post of user '${post.author.name}' posted at '${post.postedAt}' beginning with '${postShortText}' ?`;

        // TODO add ability to revoke like/dislike
        const likesClicked = (props: { label: LikeDislike }) => {
            switch (props.label) {
                case 'likes':
                    dispatch(addPostLike({postId: id, user}));
                    break;
                case 'dislikes':
                    dispatch(addPostDislike({postId: id, user}));
                    break;
            }
        };
        // TODO add spinners for "loading data..."
        return (
            <>
                <div className='post'>
                    <div className='post__body'>
                        <div className='post__body_header'>
                            <div
                                className='center border-1-right border-1-left border-1-top bold'>Author
                            </div>
                            <div className='center border-1-top border-1-right bold'>Message</div>
                        </div>
                        <div className='post__body_data'>
                            <UserInfo user={post.author}/>
                            <PostText
                                text={post.text}
                                editable={editable}
                                onSave={editSave}
                                onCancel={editCancel}
                            />
                        </div>
                    </div>
                    <div className='post__info'>
                        <PostInfo post={post} onClick={likesClicked} user={user}>
                            {(isAuthenticated && !user.isBanned) ?
                                <Button
                                    onClick={handleReply} {...(editable ? {disabled: true} : '')}>reply</Button> : ''}
                            {((isAuthenticated && !user.isBanned && user.id === post.author.id) || user.isAdmin) ?
                                (<>
                                    <Button
                                        onClick={handleRemove} {...(editable ? {disabled: true} : '')}>remove</Button>
                                    <Button onClick={handleEdit} {...(editable ? {disabled: true} : '')}>edit</Button>
                                </>)
                                : ''
                            }
                        </PostInfo>
                        {user.isAdmin ? <AdminPostPanel post={post}/> : ''}
                        <Confirmation
                            title='Remove post'
                            show={confirmationShown}
                            message={confirmationText}
                            onAccept={removeCurrentPost}
                            onReject={handleReject}
                        />
                    </div>
                </div>
            </>
        );
    }
;

const PostMemo = React.memo(Post);
export default PostMemo;