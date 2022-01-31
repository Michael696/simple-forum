import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectForumList,
} from './forumListSlice';
import ForumItem from './ForumItem';

export default function ForumList() {
    const forumList = useSelector(selectForumList);

    const forums = forumList.map(it => {
        return <ForumItem key={it} name={it}/>
    });
    return (<div className='main-forums'>
        <div>Forums</div>
        {forums}
    </div>);
}