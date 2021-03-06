import React from 'react';
import {selectForumWithId} from "./forumsSlice";
import {useSelector} from "react-redux";
import {Id} from "../../app/types";
import './Forums.sass';
import {Link} from "react-router-dom";
import {RootState} from "../../app/store";

export default function ForumItem({id}: { id: Id }) {
    const forum = useSelector((state: RootState) => selectForumWithId(state, id));
    return (forum ?
            <div className='forum__item'>
                <div className='border-1 width-100 flex-direction-vertical pad05'>
                    <Link to={`/forum/${id}`} key={id} className='bold'>
                        <div className='main-forum__name'>{forum.name}</div>
                    </Link>
                    <div>{forum.description}</div>
                </div>
                <div className='border-1 flex-center-horizontal pad05'>{forum.themeCount}</div>
                <div className='border-1 flex-center-horizontal pad05'>{forum.postCount}</div>
                <div className='border-1 flex-direction-vertical flex-center-horizontal pad05'>
                    <div>
                        {forum.lastMessage.dateTime}
                    </div>
                    <div>
                        {forum.lastMessage.user.name}
                    </div>
                </div>
            </div> : null
    );
}