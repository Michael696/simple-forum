import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import {useNavigate, useParams} from "react-router";
import {fetchForums, selectForumWithId} from '../../../features/forumsList/forumsSlice';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {AppDispatch} from "../../../app/store";
import {selectCurrentUser} from "../../../features/currentUser/currentUserSlice";
import {url} from "../../../app/urls";
import Textarea from '../Textarea/Textarea';
import {MAX_POST_LENGTH} from "../../../app/settings";
import {addThreadWithPost, fetchThreads} from "../../../features/threads/threadsSlice";
import {debug} from "../../../app/helpers";
import './NewThreadForm.sass';

export default function NewThreadForm() {
    const [threadName, setThreadName] = useState('');
    const [postText, setPostText] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const forum = useAppSelector(state => selectForumWithId(state, params.forumId || ''));
    const user = useAppSelector(selectCurrentUser);
    const titleRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        debug('fetch forums');
        dispatch(fetchForums());
        titleRef.current.focus();
    }, [dispatch]);

    // TODO show error if params.forumId does not refer to real forum id
    const handleCreate = async () => {
        if (params.forumId) {
            dispatch(addThreadWithPost({
                forumId: params.forumId,
                title: threadName,
                userId: user.id,
                text: postText
            }));
            dispatch(fetchThreads(params.forumId, true));
            navigate(`${url.FORUM}/${params.forumId}`);
        }
    };

    const handlePostChange = (text: string) => {
        setPostText(text);
    };

    const buttonOptions = (threadName.length === 0 || postText.length === 0) ? {disabled: true} : {};

    return forum ? (
        <div className='new-thread-form form-width-50'>
            <h6 className='new-thread-form__header center border-1-top border-1-left border-1-right border-1-bottom pad05 border-top-round-025'>
                Create new thread in forum {`'${forum.name}'`}
            </h6>
            <Form className='border-1-right border-1-left border-1-bottom border-bottom-round-025 pad-1'>
                <Form.Group className='mb-3' controlId="formThreadName">
                    <Form.Label>Thread name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={threadName}
                        ref={titleRef}
                        onChange={(e) => {
                            setThreadName(e.target.value);
                        }}
                    />
                    <Form.Label>Post text</Form.Label>
                    <Textarea text={postText} maxLength={MAX_POST_LENGTH} onChange={handlePostChange}/>
                </Form.Group>
                <Button onClick={handleCreate} {...buttonOptions}>Create</Button>
            </Form>
        </div>
    ) : <></>;
}