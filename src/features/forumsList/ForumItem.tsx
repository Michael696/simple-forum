import React from 'react';
import {forumWithId} from "./forumsSlice";
import {useSelector} from "react-redux";
import {Forum} from "../../app/types";

export default function ForumItem({id}: { id: string }) {
    const forum: Forum = useSelector(state => forumWithId(state, id));
    console.log('forum ', id, forum);
    const handleForumClick = () => {
        console.log(`forum ${id} clicked`);
    };
    return (
        <div className='main-forum__item' onClick={handleForumClick}>
            <div className='main-forum__cell-variable flex-direction-vertical'>
                <div className='main-forum__name'>{forum.name}</div>
                <div className='main-forum__description'>{forum.description}</div>
            </div>
            <div className='main-forum__cell-constant'>themes:{forum.themeCount}</div>
            <div className='main-forum__cell-constant'>posts:{forum.postCount}</div>
            <div className='main-forum__cell-constant flex-direction-vertical'>
                <div>
                    {forum.lastMessage.dateTime}
                </div>
                <div>
                    {forum.lastMessage.user.name}
                </div>
            </div>
        </div>
    );
}