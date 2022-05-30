import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import {useNavigate, useParams} from "react-router";
import {fetchForums, forumWithId} from '../../../features/forumsList/forumsSlice';
import {ForumItemType} from "../../../app/types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {AppDispatch} from "../../../app/store";
import {userApi} from "../../../app/userApi";
import {currentUser} from "../../../features/currentUser/currentUserSlice";
import {url} from "../../../app/urls";
import Textarea from '../Textarea/Textarea';
import {MAX_POST_LENGTH} from "../../../app/settings";
import {fetchThreads} from "../../../features/threads/threadsSlice";

export default function NewThreadForm() {
    const [threadName, setThreadName] = useState('');
    const [postText, setPostText] = useState('');
    const {forumId} = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const forum: ForumItemType = useAppSelector(state => forumWithId(state, forumId));
    const user = useAppSelector(currentUser);

    useEffect(() => {
        console.log('fetch forums');
        dispatch(fetchForums());
    }, []);

    const handleCreate = async e => {
        console.log('create thread', threadName, forumId, forum.name, user);
        const thread = await userApi.createThread({forumId, userId: user.id, name: threadName});
        console.log('created thread with id:', thread);
        const postId = await userApi.createPost({
            text: postText,
            forumId,
            threadId: thread.id.toString(), // TODO ensure threadId type is a string on back, not on front !!!
            userId: user.id
        });
        dispatch(fetchThreads(forumId, true));
        console.log('created post with id:', postId);
        navigate(`${url.FORUM}/${forumId}`);
    };

    const handlePostChange = text => {
        setPostText(text);
    };

    const buttonOptions = (threadName.length === 0 || postText.length === 0) ? {disabled: true} : {};

    return forum ? (
        <div className='form-width-50 border-1 pad-1 border-round-05'>
            <h6 className='center'>Creating new thread in forum {`'${forum.name}'`}</h6>
            <Form.Group className="mb-3" controlId="formThreadName">
                <Form.Label>Thread name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder=""
                    value={threadName}
                    onChange={(e) => {
                        setThreadName(e.target.value);
                    }}
                />
                <Form.Label>Post text</Form.Label>
                <Textarea text={postText} maxLength={MAX_POST_LENGTH} onChange={handlePostChange}/>
            </Form.Group>
            <Button onClick={handleCreate} {...buttonOptions}>Create</Button>
        </div>
    ) : <></>;
}