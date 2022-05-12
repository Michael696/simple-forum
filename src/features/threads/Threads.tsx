import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {fetchThreads, threadsList} from "./threadsSlice";
import {ThreadItemType} from "../../app/types";
import {AppDispatch} from "../../app/store";
import ThreadItem from "./ThreadItem";
import NewThreadButton from "../../components/forum/NewThreadButton";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {isUserAuthenticated} from "../currentUser/currentUserSlice";
import {url} from "../../app/urls";

export default function Threads() {
    const params = useParams();
    const navigate = useNavigate();
    const threads: Array<ThreadItemType> = useAppSelector(threadsList);
    const dispatch: AppDispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const fetch = fetchThreads(params.forumId); // forumId

    useEffect(() => {
        dispatch(fetch)
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
        // console.log('linkTo', linkTo);
        return (
            <Link to={linkTo} key={thread.id} className='link-as-text'>
                <ThreadItem key={thread.id} id={thread.id}/>
            </Link>);
    });

    return (
        <div className='threads'>
            <div>Forum id is {params.forumId}</div>
            {isAuthenticated ? <NewThreadButton onClick={handleNewThread}/> : ''}
            {threadList ? threadList : `no threads in forum ${params.forumId}`}
        </div>
    );
}