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

    forumList.unshift(
        <div className='forum__header'>
            <div className='cell-variable flex-direction-vertical center pad05'>
                Forums
            </div>
            <div className='cell-constant flex-center-vertical center pad05'>Themes</div>
            <div className='cell-constant flex-center-vertical center pad05'>Posts</div>
            <div className='cell-constant flex-direction-vertical center flex-center-vertical pad05'> Last message</div>
        </div>
    );

    return (<div className='forums margin05'>
        {forumList}
    </div>);
}