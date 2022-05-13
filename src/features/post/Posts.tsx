import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchPosts, postsIsLoading, postsList} from "./postsSlice";
import {useSelector} from "react-redux";
import {PostItemType} from "../../app/types";
import Post from "./Post";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export default function Posts() {
    const params = useParams();
    const posts: Array<PostItemType> = useSelector(postsList);
    const isLoading = useAppSelector(postsIsLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts(params.threadId));
    }, []);

    const postList = posts && posts.map(post => {
        return <Post key={post.id} id={post.id}/>
    });

    return (
        <div className='post-list'>
            {isLoading === 'pending' ?
                'loading posts...'
                : (postList.length ? postList : `no posts in thread ${params.threadId}`)
            }
        </div>
    );
}