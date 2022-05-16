import React, {useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import {Id} from "../../../app/types";
import {userApi} from "../../../app/userApi";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {currentUser} from "../../../features/currentUser/currentUserSlice";
import {useNavigate} from "react-router-dom";
import {url} from "../../../app/urls";
import {fetchPosts} from "../../../features/post/postsSlice";

export default function NewPostForm({forumId, threadId, text}: { forumId: Id, threadId: Id, text: string }) {
    const [postText, setPostText] = useState(text);
    const user = useAppSelector(currentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCreate = async e => {
        console.log('create post for thread', threadId);
        const postId = await userApi.createPost({forumId, threadId, userId: user.id, text: postText});
        console.log('created post with id:', postId);
        if (!postId) {
            navigate(url.SIGN_IN);
        } else {
            dispatch(fetchPosts(threadId));
            setPostText('');
        }
    };

    return (
        <>
            <Form.Group className="mb-3" controlId="formPostName">
                <Form.Label>post text</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder=""
                    value={postText}
                    onChange={(e) => {
                        setPostText(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='primary' onClick={handleCreate}>create post</Button>
        </>
    )
}