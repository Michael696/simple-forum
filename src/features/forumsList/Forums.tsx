import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchForums, forumsList} from './forumsSlice';
import ForumItem from './ForumItem';
import {AppDispatch} from "../../app/store";
import './Forums.sass';

export default function Forums() {
    const forums = useSelector(forumsList);
    // const isLoading = useSelector(forumsIsLoading);
    const dispatch: AppDispatch = useDispatch();

    const updateForums = () => {
        dispatch(fetchForums());
    };

    useEffect(() => {
        updateForums();
    }, []);

    const forumList = forums.map(forum => <ForumItem key={forum.id} id={forum.id}/>);

    return (<div className='forums'>
        <strong>Forums</strong>
        {forumList}
    </div>);
}