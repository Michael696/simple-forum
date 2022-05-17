import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import {Id} from "../../../app/types";
import {userApi} from "../../../app/userApi";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {currentUser} from "../../../features/currentUser/currentUserSlice";
import {useNavigate} from "react-router-dom";
import {url} from "../../../app/urls";
import {fetchPosts} from "../../../features/post/postsSlice";

const NewPostForm = function ({forumId, threadId, text}: { forumId: Id, threadId: Id, text: string }) {
    const [postText, setPostText] = useState(text);
    const user = useAppSelector(currentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const textRef = useRef<HTMLTextAreaElement>() as MutableRefObject<HTMLTextAreaElement>;

    const handleCreate = useCallback(async e => {
        console.log('create post for thread', threadId);
        const postId = await userApi.createPost({forumId, threadId, userId: user.id, text: postText});
        console.log('created post with id:', postId);
        if (!postId) {
            navigate(url.SIGN_IN);
        } else {
            dispatch(fetchPosts(threadId));
            setPostText('');
        }
    }, []);

    useEffect(() => {
        setPostText(text);
        textRef.current.focus();
    }, [text]);

    return (
        <>
            <Form.Group className="mb-3" controlId="formPostName">
                <Form.Label>post text</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder=""
                    value={postText}
                    ref={textRef}
                    onChange={(e) => {
                        setPostText(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='primary' onClick={handleCreate}>create post</Button>
        </>
    )
};

const NewPostFormWithMemo = React.memo(NewPostForm);
export default NewPostFormWithMemo;