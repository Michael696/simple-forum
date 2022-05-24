import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Id, PostItemType, ThreadItemType, User} from "../../app/types";
import {postDislike, postLike, postWithId, removePost, setPostText} from "./postsSlice";
import UserInfo from "../../components/forum/UserInfo/UserInfo";
import PostText from "../../components/forum/PostText";
import PostInfo from "../../components/forum/PostInfo/PostInfo";
import {useAppSelector} from "../../app/hooks";
import {currentUser, isUserAuthenticated} from "../currentUser/currentUserSlice";
import AdminPostPanel from '../../components/forum/adminPostPanel/AdminPostPanel';
import './Post.sass';
import Button from "react-bootstrap/cjs/Button";

export type LikeDislike = 'likes' | 'dislikes';

const Post = function ({id, thread, onReply}: { id: Id, thread: ThreadItemType, onReply: (id: Id) => void }) {
        const post: PostItemType = useSelector(state => postWithId(state, id));
        const isAuthenticated = useAppSelector(isUserAuthenticated);
        const dispatch = useDispatch();
        const user: User = useAppSelector(currentUser);
        const [editable, setEditable] = useState(false);

        const handleReply = useCallback(() => {
            onReply(id);
        }, [onReply, id]);

        const handleRemove = useCallback(() => {
            console.log('remove post', id);
            dispatch(removePost(id))
        }, []);

        const handleEdit = useCallback(() => {
            setEditable(true);
            console.log('edit post', id);
        }, []);

    const editCancel = useCallback(() => {
            setEditable(false);
    }, []);

    const editSave = useCallback((text) => {
            setEditable(false);
            console.log(`setting post ${post.id} text:`, text);
            dispatch(setPostText(post.id, text));
    }, [post]);

        const likesClicked =
            (isAuthenticated && !user.isBanned) ?
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
                    <div className='post__body'>
                        <div className='post__body_header'>
                            <div
                                className='center border-1-gray-right border-1-gray-left border-1-gray-top bold'>Author
                            </div>
                            <div className='center border-1-gray-top border-1-gray-right bold'>Message</div>
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
                            {(isAuthenticated && (!user.isBanned && user.id === post.author.id) || user.isAdmin) ?
                                (<>
                                    <Button
                                        onClick={handleRemove} {...(editable ? {disabled: true} : '')}>remove</Button>
                                    <Button onClick={handleEdit} {...(editable ? {disabled: true} : '')}>edit</Button>
                                </>)
                                : ''
                            }
                        </PostInfo>
                        {user.isAdmin ? <AdminPostPanel post={post}/> : ''}
                    </div>
                </div>
            </>
        );
    }
;

const PostMemo = React.memo(Post);
export default PostMemo;