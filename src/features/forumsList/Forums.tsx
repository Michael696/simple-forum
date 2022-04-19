import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";

import {forumsList, fetchForums, forumsIsLoading} from './forumsSlice';
import ForumItem from './ForumItem';

export default function Forums() {
    const forums = useSelector(forumsList);
    // const isLoading = useSelector(forumsIsLoading);
    const dispatch = useDispatch();
    const fetch = fetchForums();

    const updateForums = () => {
        dispatch(fetch);
    };

    useEffect(() => {
        updateForums();
    }, []);

    const forumList = forums.map(forum => {
        return (
            <Link to={`/forum/${forum.id}`} key={forum.id} className='main-forum__link-as-text'>
                <ForumItem key={forum.id} id={forum.id}/>
            </Link>);
    });

    return (<div className='main-forums'>
        <strong>Forums</strong>
        {forumList}
    </div>);
}