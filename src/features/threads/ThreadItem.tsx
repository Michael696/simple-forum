import React from 'react';
import {threadWithId} from "./threadsSlice";
import {useSelector} from "react-redux";
import {Id, ThreadItemType} from "../../app/types";

export default function ThreadItem({id}: { id?: Id }) {
    const thread: ThreadItemType = useSelector(state => threadWithId(state, id));

    return (
        <div className='forum__item'>
            <div className='cell-variable flex-direction-vertical pad05'>
                <div className='main-forum__description'>{thread.title}</div>
                <div className='main-forum__name'>Author: {thread.author.name}</div>
            </div>
            <div className='cell-constant flex-center-vertical pad05'>posts:{thread.postCount}</div>
            <div className='cell-constant flex-center-vertical pad05'>views:{thread.viewCount}</div>
            <div className='cell-constant flex-direction-vertical flex-center-vertical pad05'>
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