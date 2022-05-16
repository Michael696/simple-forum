import React, {useCallback, useEffect, useState} from 'react';
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

    const handleReply = useCallback((id) => {
        const found = posts.find(p => p.id === id);
        if (found) {
            console.log('reply to', found);
            const text = `user '${found.author.name}' wrote at ${found.postedAt}:\r\n` +
                `===========================\r\n` +
                `${found.text}\r\n` +
                `===========================\r\n`;
            console.log('reply text', text);
            setPostText(text);
        }
    }, []);

    const postList = posts && posts.map(post => {
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
            <NewPostForm text={postText} threadId={params.threadId} forumId={params.forumId}/>
        </>
    );
}