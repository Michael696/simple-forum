import React from 'react';
import {selectThreadWithId} from "./threadsSlice";
import {useSelector} from "react-redux";
import {Id, ThreadItemType} from "../../app/types";
import './Threads.sass';

export default function ThreadItem({id}: { id?: Id }) {
    const thread: ThreadItemType = useSelector(state => selectThreadWithId(state, id));

    return (
        <div className='thread__item'>
            <div className='border-1 width-100 flex-direction-vertical pad05'>
                <div className='bold'>{thread.title}</div>
            </div>
            <div className='border-1 flex-center-horizontal pad05'>{thread.author.name}</div>
            <div className='border-1 flex-center-horizontal pad05'>{thread.postCount}</div>
            <div className='border-1 flex-center-horizontal pad05'>{thread.viewCount}</div>
            <div className='border-1 flex-direction-vertical flex-center-horizontal pad05'>
                <div>
                    {thread.lastMessage.dateTime}
                </div>
                <div>
                    {thread.lastMessage.user.name}
                </div>
            </div>
        </div>
    );
}