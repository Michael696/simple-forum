import React from 'react';
import {forumWithId} from "./forumsSlice";
import {useSelector} from "react-redux";
import {Forum, Id} from "../../app/types";
import './Forums.sass';

export default function ForumItem({id}: { id: Id }) {
    const forum: Forum = useSelector(state => forumWithId(state, id));
    return (
        <div className='forum__item'>
            <div className='cell-variable flex-direction-vertical'>
                <div className='main-forum__name'>{forum.name}</div>
                <div className='main-forum__description'>{forum.description}</div>
            </div>
            <div className='cell-constant flex-center-vertical'>themes:{forum.themeCount}</div>
            <div className='cell-constant flex-center-vertical'>posts:{forum.postCount}</div>
            <div className='cell-constant flex-direction-vertical flex-center-vertical'>
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