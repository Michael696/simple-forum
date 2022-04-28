import React from 'react';
import '../../features/post/Post.sass';

export default function PostText({text}: { text: string }) {
    return (
        <div className='post__text pad05'>
            {text}
        </div>
    );
}