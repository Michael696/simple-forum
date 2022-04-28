import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import {forumsList, fetchForums, forumsIsLoading} from './forumsSlice';
import ForumItem from './ForumItem';
import {AppDispatch} from "../../app/store";
import './Forums.sass';

export default function Forums() {
    const forums = useSelector(forumsList);
    // const isLoading = useSelector(forumsIsLoading);
    const dispatch:AppDispatch = useDispatch();
    const fetch = fetchForums();

    const updateForums = () => {
        dispatch(fetch);
    };

    useEffect(() => {
        updateForums();
    }, []);

    const forumList = forums.map(forum => {
        return (
            <Link to={`/forum/${forum.id}`} key={forum.id} className='link-as-text'>
                <ForumItem key={forum.id} id={forum.id}/>
            </Link>);
    });

    return (<div className='forums'>
        <strong>Forums</strong>
        {forumList}
    </div>);
}