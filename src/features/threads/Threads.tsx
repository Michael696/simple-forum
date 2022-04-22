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
    const navigate= useNavigate();
    const threads: Array<ThreadItemType> = useAppSelector(threadsList);
    const dispatch: AppDispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const fetch = fetchThreads(params.id); // forumId

    useEffect(() => {
        dispatch(fetch)
    }, []);

    const handleNewThread = () => {
        if (isAuthenticated) {
            console.log(`new thread for forum ${params.id}`);
        } else {
            navigate(url.SIGN_IN);
        }
    };

    const threadList = threads && threads.map(thread => {
        return (
            <Link to={`/thread/${thread.id}`} key={thread.id} className='main-forum__link-as-text'>
                <ThreadItem key={thread.id} id={thread.id}/>
            </Link>);
    });

    return (
        <div className='main-threads'>
            <div>Forum id is {params.id}</div>
            <NewThreadButton onClick={handleNewThread}/>
            {threadList ? threadList : `no threads in forum ${params.id}`}
        </div>
    );
}