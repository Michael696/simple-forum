import React from 'react';
import {forumWithId} from "./forumsSlice";
import {useSelector} from "react-redux";
import {Forum} from "../../app/types";

export default function ForumItem({id}: { id: string }) {
    const forum: Forum = useSelector(state => forumWithId(state, id));
    console.log('forum ', id, forum);
    const handleForumClick = () =>{
      console.log(`forum ${id} clicked`);
    };
    return (
        <div className='main-forum__item' onClick={handleForumClick}>
            <span>{forum.name}</span>
            <span>{forum.description}</span>
            <span>themes:{forum.themeCount}</span>
            <span>posts:{forum.postCount}</span>
            <span>lastMsg:{JSON.stringify(forum.lastMessage)}</span>
        </div>
    );
}