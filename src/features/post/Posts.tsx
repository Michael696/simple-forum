import React from 'react';
import {useParams} from 'react-router-dom';
import {threadWithId} from "../threads/threadsSlice";
import {useSelector} from "react-redux";
import {Id, ThreadItemType} from "../../app/types";

export default function Posts() {
    const params = useParams();
    // const thread: ThreadItemType = useSelector(state => threadWithId(state, params.id));

    console.log('Posts params', params);

    const handleThreadClick = () => {
        // console.log(`thread ${id} clicked`);
    };
    return (
        <div className='main-forum__thread' onClick={handleThreadClick}>
            {`some posts of thread ${params.id} here`}
        </div>
    );
}