import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchThreads, threadsList} from "./threadsSlice";
import {ThreadItemType} from "../../app/types";
import {AppDispatch} from "../../app/store";
import ThreadItem from "./ThreadItem";

export default function Threads() {
    const params = useParams();
    const threads: Array<ThreadItemType> = useSelector(threadsList);
    const dispatch: AppDispatch = useDispatch();
    const fetch = fetchThreads(params.id);

    useEffect(() => {
        dispatch(fetch)
    }, []);

    console.log('Threads params', params);
    console.log('Threads', threads);

    const threadList = threads && threads.map(thread => {
        return (
            <Link to={`/thread/${thread.id}`} key={thread.id} className='main-forum__link-as-text'>
                <ThreadItem key={thread.id} id={thread.id}/>
            </Link>);
    });

    return (
        <div className='main-threads'>
            <div>Forum id is {params.id}</div>
            {threadList}
        </div>
    );
}