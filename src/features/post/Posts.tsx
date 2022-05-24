import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchPosts, postsIsLoading, postsList} from "./postsSlice";
import {PostItemType, User} from "../../app/types";
import Post from "./Post";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import NewPostForm from "../../components/forum/NewPostForm/NewPostForm";
import {currentUser} from "../currentUser/currentUserSlice";
import Button from "react-bootstrap/cjs/Button";
import {fetchThreads, removeThread, threadWithId} from "../threads/threadsSlice";
import StatusHintMessage from "../../components/forum/StatusHintMessage/StatusHintMessage";
import {url} from "../../app/urls";

export default function Posts() {
    const params = useParams();
    const posts: Array<PostItemType> = useAppSelector(postsList);
    const isLoading = useAppSelector(postsIsLoading);
    const user: User = useAppSelector(currentUser);
    const dispatch = useAppDispatch();
    const [postText, setPostText] = useState('');
    const thread = useAppSelector(state => threadWithId(state, params.threadId)); // TODO component fails to reload, fetch threads first ?
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchThreads(params.forumId));
        dispatch(fetchPosts(params.threadId));
    }, []);

    const handleReply = useCallback((id) => {
        console.log('searching for post ', id, posts);
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
        window.scrollTo(0, document.body.scrollHeight); // scroll to bottom
    }, [posts]);

    const handleRemoveThread = useCallback(() => {
        console.log('removing thread ', params.threadId);
        dispatch(removeThread(params.threadId));
        navigate(`${url.FORUM}/${params.forumId}`);
    }, [params.threadId, params.forumId]);

    if (thread) {

        const threadTitle = [`'${thread.title}', author '${thread.author.name}'`];
        if (thread.author.id === user.id) {
            threadTitle.push('hey, it\'s You !');
        }
        /*
                if (thread.author.isAdmin) {
                    threadTitle.push('admin');
                }
        */
        if (thread.author.isBanned) {
            threadTitle.push('banned');
        }

        const postList = posts && posts.map(post => {
            return <Post key={post.id} id={post.id} thread={thread} onReply={handleReply}/>
        });

        postList.unshift(
            <div
                className='forum-title border-1-gray-right border-1-gray-top border-1-gray-left bold border-top-round025'>
                Thread {threadTitle.join(', ')}
            </div>
        );

// TODO add pagination
        return (
            <>


                <div className='post-list margin05'>
                    {isLoading === 'pending' ?
                        'loading posts...'
                        : (postList.length ? postList : `no posts in thread ${params.threadId}`)
                    }
                </div>
                {(user.id === thread.author.id || user.isAdmin) ?
                    <Button onClick={handleRemoveThread}>remove thread</Button> : ''}
                <StatusHintMessage>
                    <NewPostForm text={postText} threadId={params.threadId} forumId={params.forumId}/>
                </StatusHintMessage>
            </>
        );
    } else {
        return <></>;
    }
}