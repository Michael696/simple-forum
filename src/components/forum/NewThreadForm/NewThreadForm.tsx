import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import {useNavigate, useParams} from "react-router";
import {fetchForums, forumWithId} from '../../../features/forumsList/forumsSlice';
import {Forum} from "../../../app/types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {AppDispatch} from "../../../app/store";
import {userApi} from "../../../app/userApi";
import {currentUser} from "../../../features/currentUser/currentUserSlice";
import {url} from "../../../app/urls";

export default function NewThreadForm() {
    const [threadName, setThreadName] = useState('');
    const {forumId} = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const forum: Forum = useAppSelector(state => forumWithId(state, forumId));
    const user = useAppSelector(currentUser);

    useEffect(() => {
        console.log('fetch forums');
        dispatch(fetchForums());
    }, []);

    const handleCreate = async e => {
        console.log('create thread', threadName, forumId, forum.name, user);
        const threadId = await userApi.createThread({forumId, userId: user.id, name: threadName});
        console.log('created thread with id:', threadId);
        navigate(`${url.FORUM}/${forumId}`);
    };

    const buttonOptions = (threadName.length === 0) ? {disabled: true} : {};

    return forum ? (
        <div className='form-width-50'>
            <h5 className='center'>Creating new thread in forum {`'${forum.name}'`}</h5>
            <Form.Group className="mb-3" controlId="formThreadName">
                <Form.Label>thread name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder=""
                    value={threadName}
                    onChange={(e) => {
                        setThreadName(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='primary' onClick={handleCreate} {...buttonOptions}>Create</Button>
        </div>
    ) : <></>;
}