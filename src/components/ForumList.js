import React from 'react';
import ForumItem from './ForumItem';

export default function ForumList() {
    const forumList = [1, 2].map(it => {
        return <ForumItem key={it} name={it}/>
    });
    return (<div className='main-forums'>
        <div>Forums</div>
        {forumList}
    </div>);
}