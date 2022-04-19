import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';

import {forumsList, fetchForums, forumsIsLoading} from './forumsSlice';
import ForumItem from './ForumItem';

export default function Forums() {
    const forums = useSelector(forumsList);
    const isLoading = useSelector(forumsIsLoading);
    const dispatch = useDispatch();
    const fetch = fetchForums();

    const updateForums = () => {
        dispatch(fetch);
    };

    const handleUpdate = () => {
        updateForums();
    };

    useEffect(() => {
        updateForums();
    }, []);

    const forumList = forums.map(forum => {
        return <ForumItem key={forum.id} id={forum.id}/>
    });

    return (<div className='main-forums'>
        <div>Forums</div>
        <div>
            {forumList}
        </div>
        <Button onClick={handleUpdate}>update</Button>
    </div>);
}