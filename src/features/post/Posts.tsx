import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchPosts, postsList} from "./postsSlice";
import {useSelector} from "react-redux";
import {PostItemType} from "../../app/types";
import Post from "./Post";
import {useAppDispatch} from "../../app/hooks";
import {fetchThreadsAndView} from "../threads/threadsSlice";

export default function Posts() {
    const params = useParams();
    const posts: Array<PostItemType> = useSelector(postsList);
    const dispatch = useAppDispatch();

    console.log('Posts params', params);

    useEffect(() => {
        console.log(`Posts ${params.threadId} mount`);
        dispatch(fetchThreadsAndView(params.forumId, params.threadId));
        // dispatch(addViewCount(thread.id));
        dispatch(fetchPosts(params.threadId));
    }, []);

    const postList = posts && posts.map(post => {
        return <Post key={post.id} id={post.id}/>
    });

    return (
        <div className='main-forum__posts'>
            {postList ? postList : `no posts in thread ${params.threadId}`}
        </div>
    );
}