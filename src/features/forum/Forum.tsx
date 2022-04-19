import React from 'react';
import { useParams } from 'react-router-dom';

export default function Forums() {
    let params = useParams();
    return (<div className='main-forum'>
        <div>Forum name is {params.id}</div>
    </div>);
}