import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';

import {
    set,
    selectForumList,
} from './forumListSlice';
import ForumItem from './ForumItem';

export default function ForumList() {
    const forumList = useSelector(selectForumList);
    const dispatch = useDispatch();

    const forums = forumList.map(it => {
        return <ForumItem key={it} name={it}/>
    });
    return (<div className='main-forums'>
        <div>Forums</div>
        {forums}
        <Button onClick={() => dispatch(set([1, 2, 3, 4]))}>click</Button>
    </div>);
}