import React from 'react';
import {forumWithId} from "./forumsSlice";
import {useSelector} from "react-redux";
import {Forum, Id} from "../../app/types";
import './Forums.sass';
import {Link} from "react-router-dom";

export default function ForumItem({id}: { id: Id }) {
    const forum: Forum = useSelector(state => forumWithId(state, id));
    return (
        <div className='forum__item'>
            <div className='cell-variable flex-direction-vertical pad05'>
                <Link to={`/forum/${id}`} key={id}>
                    <div className='main-forum__name'>{forum.name}</div>
                </Link>
                <div className='main-forum__description'>{forum.description}</div>
            </div>
            <div className='cell-constant flex-center-vertical pad05'>themes:{forum.themeCount}</div>
            <div className='cell-constant flex-center-vertical pad05'>posts:{forum.postCount}</div>
            <div className='cell-constant flex-direction-vertical flex-center-vertical pad05'>
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