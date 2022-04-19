import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
// import Button from 'react-bootstrap/Button';

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

    /*
        const handleUpdate = () => {
            updateForums();
        };
    */

    useEffect(() => {
        updateForums();
    }, []);

    const forumList = forums.map(forum => {
        return (
            <Link to={`/forum/${forum.id}`} key={forum.id}>
                <ForumItem key={forum.id} id={forum.id}/>
            </Link>);
    });

    return (<div className='main-forums'>
        <div>Forums</div>
        <div>
            {forumList}
        </div>
        {/*<Button onClick={handleUpdate}>update</Button>*/}
    </div>);
}