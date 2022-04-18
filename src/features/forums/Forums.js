import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';

import {forumsList, fetchForums ,forumsIsLoading} from './forumsSlice';
import ForumItem from './ForumItem';

export default function Forums() {
    const forums = useSelector(forumsList);
    const isLoading = useSelector(forumsIsLoading);
    const dispatch = useDispatch();
    const fetch = fetchForums();

    useEffect(() => {
        dispatch(fetch);
    }, []);

    // const forumsList = forums.map(it => {
    //     return <ForumItem key={it} name={it}/>
    // });
    console.log('forums',forums);
    return (<div className='main-forums'>
        <div>Forums</div>
        { isLoading==='pending' ? 'loading' :'done'}
    </div>);
}