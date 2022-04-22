import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchPosts, postsList} from "./postsSlice";
import {useDispatch, useSelector} from "react-redux";
import {PostItemType} from "../../app/types";
import {AppDispatch} from "../../app/store";
import Post from "./Post";

export default function Posts() {
    const params = useParams();
    const posts: Array<PostItemType> = useSelector(postsList);
    const dispatch: AppDispatch = useDispatch();
    const fetch = fetchPosts(params.id);

    useEffect(() => {
        dispatch(fetch);
    }, []);

    const postList = posts && posts.map(post => {
        return <Post key={post.id} id={post.id}/>
    });

    return (
        <div className='main-forum__posts'>
            {postList ? postList : `no posts in thread ${params.id}`}
        </div>
    );
}