import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchPosts, postsIsLoading, postsList} from "./postsSlice";
import {useSelector} from "react-redux";
import {PostItemType} from "../../app/types";
import Post from "./Post";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import NewPostForm from "../../components/main/NewPostForm/NewPostForm";

export default function Posts() {
    const params = useParams();
    const posts: Array<PostItemType> = useSelector(postsList);
    const isLoading = useAppSelector(postsIsLoading);
    const dispatch = useAppDispatch();
    const [postText, setPostText] = useState('');

    useEffect(() => {
        dispatch(fetchPosts(params.threadId));
    }, []);

    const postList = posts && posts.map(post => {
        const handleReply = (() => {
            return () => {
                const found = posts.find(p => p.id === post.id);
                console.log('reply to', found);
                const text = `user '${post.author.name}' wrote at ${post.postedAt}:\r\n` +
                    `===========================\r\n` +
                    `${post.text}\r\n` +
                    `===========================\r\n`;
                console.log('reply text', text);
                setPostText(text);
            };
        })();
        return <Post key={post.id} id={post.id} onReply={handleReply}/>
    });

    return (
        <>
            <div className='post-list'>
                {isLoading === 'pending' ?
                    'loading posts...'
                    : (postList.length ? postList : `no posts in thread ${params.threadId}`)
                }
            </div>
            {/*<Button onClick={()=>{setPostText('zxzxvcdvdfv')}}/>*/}
            <NewPostForm text={postText} threadId={params.threadId} forumId={params.forumId}/>
        </>
    );
}