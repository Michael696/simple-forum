import React, {useEffect} from 'react';
import {fetchForums, selectForums} from './forumsSlice';
import ForumItem from './ForumItem';
import './Forums.sass';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export default function Forums() {
    const forums = useAppSelector(selectForums);
    // const isLoading = useSelector(forumsIsLoading);
    const dispatch = useAppDispatch();

    const updateForums = () => {
        dispatch(fetchForums());
    };

    useEffect(() => {
        updateForums();
    }, []);

    const forumList = forums.map(forum => <ForumItem key={forum.id} id={forum.id}/>);

    forumList.unshift(
        <div className='forum__header' key='title'>
            <div className='border-1 width-100 flex-direction-vertical center pad05'>
                Forums
            </div>
            <div className='border-1 flex-center-horizontal center pad05'>Themes</div>
            <div className='border-1 flex-center-horizontal center pad05'>Posts</div>
            <div className='border-1 flex-direction-vertical center flex-center-horizontal pad05'> Last message
            </div>
        </div>
    );

    return (
        <div className='forums margin05'>
            {forumList}
        </div>
    );
}