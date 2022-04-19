import React from 'react';
import { useParams } from 'react-router-dom';

export default function Forum() {
    let params = useParams();
    return (<div className='main-forum'>
        <div>Forum id is {params.id}</div>
    </div>);
}