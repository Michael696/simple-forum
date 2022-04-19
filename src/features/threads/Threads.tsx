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

    useEffect(() => {
        console.log('threads', threads);
    });

    const threadList = threads.map(thread=>{
/*
        return (
            <Link to={`/forum/${forum.id}/thread`} key={forum.id} className='main-forum__link-as-text'>
                <ForumItem key={forum.id} id={forum.id}/>
            </Link>);
*/
                return (
                        <ThreadItem key={thread.id} id={thread.id}/>
                )
    });

    return (
        <div className='main-threads'>
            <div>Forum id is {params.id}</div>
            {threadList}
        </div>
    );
}