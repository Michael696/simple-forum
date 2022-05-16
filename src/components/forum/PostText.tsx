import React from 'react';
import '../../features/post/Post.sass';

export default function PostText({text}: { text: string }) {
    const textReplaced = text;//.replaceAll('\n','<br/>'); // TODO save line breaks
    return (
        <div className='post__text pad05'>
            {textReplaced}
        </div>
    );
}