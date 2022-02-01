import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';

import {
    set,
    selectForums,
} from './forumsSlice';
import ForumItem from './ForumItem';

export default function Forums() {
    const forums = useSelector(selectForums);
    const dispatch = useDispatch();

    const forumsList = forums.map(it => {
        return <ForumItem key={it} name={it}/>
    });
    return (<div className='main-forums'>
        <div>Forums</div>
        {forumsList}
        <Button onClick={() => dispatch(set([1, 2, 3, 4]))}>click</Button>
    </div>);
}