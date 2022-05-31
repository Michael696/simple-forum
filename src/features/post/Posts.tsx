import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchPosts, postsIsLoading, postsList, postsTotalPages} from "./postsSlice";
import {PostItemType, User} from "../../app/types";
import Post from "./Post";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import NewPostForm from "../../components/forum/NewPostForm/NewPostForm";
import {currentUser} from "../currentUser/currentUserSlice";
import Button from "react-bootstrap/cjs/Button";
import {addThreadViewCount, fetchThreads, removeThread, threadWithId} from "../threads/threadsSlice";
import StatusHintMessage from "../../components/forum/StatusHintMessage/StatusHintMessage";
import {url, urlToPage} from "../../app/urls";
import Pagination from "../../components/forum/Pagination/Pagination";
import {userApi} from "../../app/userApi";

export default function Posts() {
    const params = useParams();
    const posts: Array<PostItemType> = useAppSelector(postsList);
    const isLoading = useAppSelector(postsIsLoading);
    const user: User = useAppSelector(currentUser);
    const dispatch = useAppDispatch();
    const [postText, setPostText] = useState('');
    const thread = useAppSelector(state => threadWithId(state, params.threadId));
    const navigate = useNavigate();
    const totalPages = useAppSelector(postsTotalPages);
    const currentPageDraft = parseInt(params.page || '1');
    const currentPage = (Number.isNaN(currentPageDraft) || currentPageDraft < 1) ? 1 : currentPageDraft;

    // TODO correctly handle the case when page specified in url is greater than real totalCount

    useEffect(() => {
        if (thread) {
            dispatch(addThreadViewCount(thread.id));
        }
    }, [thread]);

    useEffect(() => {
        dispatch(fetchThreads(params.forumId));
        dispatch(fetchPosts({threadId: params.threadId, page: currentPage}));
        console.log('current page is (from params):', params.page);
        console.log('current page is (sane):', currentPage);
        console.log('totalPages', totalPages);
        if (params.page !== currentPage.toString()) {
            console.log('pages are different, redirecting to', currentPage);
            navigate(urlToPage({forumId: params.forumId, threadId: params.threadId, page: currentPage}));
        }
    }, [totalPages]);

    const handleReply = useCallback((id) => {
        console.log('searching for post ', id, posts);
        const found = posts.find(p => p.id === id);
        if (found) {
            console.log('reply to', found);
            const text = `user '${found.author.name}' wrote at ${found.postedAt}:\r\n` + // TODO refactor to separate entity
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
            <div key='title'
                 className='forum-title border-1-right border-1-top border-1-left bold border-top-round-025'>
                Thread {threadTitle.join(', ')}
            </div>
        );

        const handleCreatePost = newText => {
            (async () => {
                console.log('create post for thread', thread.id, newText);
                const postId = await userApi.createPost({
                    forumId: params.forumId,
                    threadId: thread.id,
                    userId: user.id,
                    text: newText
                });
                console.log('created post with id:', postId);
                if (!postId) {
                    navigate(url.SIGN_IN);
                } else {
                    await dispatch(fetchPosts({threadId: thread.id, page: totalPages}));
                    setPostText('');
                }
            })();
        };

        // TODO nicify 'posts loading' message
        return (
            <>
                {(user.id === thread.author.id || user.isAdmin) ?
                    <Button onClick={handleRemoveThread}>remove thread</Button> : ''}
                <div className='post-list margin05'>
                    {isLoading === 'pending' ?
                        'loading posts...'
                        : (postList.length ? postList : `no posts in thread ${thread.id}`)
                    }
                </div>
                <Pagination totalPages={totalPages} currentPage={currentPage} onChange={async (page) => {
                    navigate(urlToPage({forumId: params.forumId, threadId: thread.id, page}));
                    await dispatch(fetchPosts({threadId: thread.id, page}));
                }}/>
                <StatusHintMessage>
                    <NewPostForm text={postText} onCreate={handleCreatePost}/>
                </StatusHintMessage>
            </>
        );
    } else {
        return <></>;
    }
}