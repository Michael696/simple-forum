import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {addThreadViewCount, fetchThreads, threadsList} from "./threadsSlice";
import {ThreadItemType} from "../../app/types";
import {AppDispatch} from "../../app/store";
import ThreadItem from "./ThreadItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {currentUser, isUserAuthenticated} from "../currentUser/currentUserSlice";
import {url} from "../../app/urls";
import Button from "react-bootstrap/cjs/Button";

export default function Threads() {
    const params = useParams();
    const navigate = useNavigate();
    const threads: Array<ThreadItemType> = useAppSelector(threadsList);
    const dispatch: AppDispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const user = useAppSelector(currentUser);

    useEffect(() => {
        dispatch(fetchThreads(params.forumId));
    }, []);

    const handleNewThread = () => {
        if (isAuthenticated) {
            navigate(`${url.NEW_THREAD + '/' + params.forumId}`);
        } else {
            navigate(url.SIGN_IN);
        }
    };

    const threadList = threads && threads.map(thread => {
        const linkTo = `${url.FORUM}/${params.forumId}${url.THREAD}/${thread.id}`;
        const addView = () => {
            dispatch(addThreadViewCount(thread.id));
        };
        return (
            <Link to={linkTo} key={thread.id} className='link-as-text' onClick={addView}>
                <ThreadItem key={thread.id} id={thread.id}/>
            </Link>);
    });

    return (
        <div className='threads margin05'>
            <div>Forum id is {params.forumId}</div>
            {(isAuthenticated && !user.isBanned) ? <Button onClick={handleNewThread}>create thread</Button> : ''}
            {threadList.length ? threadList : `no threads in forum ${params.forumId}`}
        </div>
    );
}