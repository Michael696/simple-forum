import React from 'react';

export default function PostText({text}: { text: string }) {
    return (
        <div className='main-forum-post__text pad05'>
            {text}
        </div>
    );
}