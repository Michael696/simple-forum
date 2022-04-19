import React from 'react';
import {threadWithId} from "./threadsSlice";
import {useSelector} from "react-redux";
import {Id, ThreadItemType} from "../../app/types";

export default function ThreadItem({id}: { id: Id }) {
    const thread: ThreadItemType = useSelector(state => threadWithId(state, id));
    const handleThreadClick = () => {
        console.log(`thread ${id} clicked`);
    };
    return (
        <div className='main-forum__item' onClick={handleThreadClick}>
            <div className='main-forum__cell-variable flex-direction-vertical'>
                <div className='main-forum__name'>{thread.author.name}</div>
                <div className='main-forum__description'>{thread.title}</div>
            </div>
            <div className='main-forum__cell-constant'>themes:{thread.themeCount}</div>
            <div className='main-forum__cell-constant'>posts:{thread.postCount}</div>
            <div className='main-forum__cell-constant flex-direction-vertical'>
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