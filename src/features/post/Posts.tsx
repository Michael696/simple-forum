import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchPosts, postsIsLoading, postsList} from "./postsSlice";
import {useSelector} from "react-redux";
import {PostItemType, User} from "../../app/types";
import Post from "./Post";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import NewPostForm from "../../components/forum/NewPostForm/NewPostForm";
import {currentUser} from "../currentUser/currentUserSlice";
import Button from "react-bootstrap/cjs/Button";
import {fetchThreads, threadWithId} from "../threads/threadsSlice";
import StatusHintMessage from "../../components/forum/StatusHintMessage/StatusHintMessage";

export default function Posts() {
    const params = useParams();
    const posts: Array<PostItemType> = useSelector(postsList);
    const isLoading = useAppSelector(postsIsLoading);
    const user: User = useAppSelector(currentUser);
    const dispatch = useAppDispatch();
    const [postText, setPostText] = useState('');
    const thread = useAppSelector(state => threadWithId(state, params.threadId)); // TODO component fails to reload, fetch threads first ?

    useEffect(() => {
        dispatch(fetchThreads(params.forumId));
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

    if (thread) {
        const postList = posts && posts.map(post => {
            return <Post key={post.id} id={post.id} thread={thread} onReply={handleReply}/>
        });

        const threadTitle = [`'${thread.title}', author '${thread.author.name}'`];
        if (thread.author.id === user.id) {
            threadTitle.push('it\'s You');
        }
        if (thread.author.isAdmin) {
            threadTitle.push('admin');
        }
        if (thread.author.isBanned) {
            threadTitle.push('banned');
        }

        return (
            <>
                <div>Thread {threadTitle.join(',')}</div>
                <div className='post-list'>
                    {isLoading === 'pending' ?
                        'loading posts...'
                        : (postList.length ? postList : `no posts in thread ${params.threadId}`)
                    }
                </div>
                <StatusHintMessage>
                    <NewPostForm text={postText} threadId={params.threadId} forumId={params.forumId}/>
                </StatusHintMessage>
                {(user.id === thread.author.id || user.isAdmin) ? <Button>remove thread</Button> : ''}
            </>
        );
    } else {
        return <></>;
    }
}