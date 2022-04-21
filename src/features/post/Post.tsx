import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Id, ThreadItemType} from "../../app/types";

export default function Post() {
    const params = useParams();
    // const thread: ThreadItemType = useSelector(state => threadWithId(state, params.id));

    console.log('Post params', params);

    return (
        <div className='main-forum__post'>
            {`some posts of thread ${params.id} here`}
        </div>
    );
}