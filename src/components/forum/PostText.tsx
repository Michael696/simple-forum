import React from 'react';

export default function PostText({text}: { text: string }) {
    return (
        <div className='main-forum-post__text'>
            {JSON.stringify(text)}
        </div>
    );
}