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
import {debug} from "../../app/debug";
import {fetchBanned} from "../bannedUsers/bannedUsersSlice";
import Confirmation from "../../components/main/Confirmation/Confirmation";

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
    const [confirmationShown, setConfirmationShown] = useState(false);

    // TODO correctly handle the case when page specified in url is greater than real totalCount

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(fetchBanned());
        }
    }, [user]);

    useEffect(() => {
        if (thread) {
            dispatch(addThreadViewCount(thread.id));
        }
    }, [thread]);

    useEffect(() => {
        dispatch(fetchThreads(params.forumId));
        dispatch(fetchPosts({threadId: params.threadId, page: currentPage}));
        debug('current page is (from params):', params.page);
        debug('current page is (sane):', currentPage);
        debug('totalPages', totalPages);
        if (params.page !== currentPage.toString()) {
            debug('pages are different, redirecting to', currentPage);
            navigate(urlToPage({forumId: params.forumId, threadId: params.threadId, page: currentPage}));
        }
    }, [totalPages]);

    const handleReply = useCallback((id) => {
        debug('searching for post ', id, posts);
        const found = posts.find(p => p.id === id);
        if (found) {
            debug('reply to', found);
            const text = `user '${found.author.name}' wrote at ${found.postedAt}:\r\n` + // TODO refactor to separate entity
                `===========================\r\n` +
                `${found.text}\r\n` +
                `===========================\r\n`;
            debug('reply text', text);
            setPostText(text);
        }
        window.scrollTo(0, document.body.scrollHeight); // scroll to bottom
    }, [posts]);

    const removeCurrentThread = useCallback(() => {
        setConfirmationShown(false);
        debug('removing thread ', params.threadId);
        dispatch(removeThread(params.threadId));
        navigate(`${url.FORUM}/${params.forumId}`);
    }, [params.threadId]);

    const handleRemoveThread = useCallback(() => {
        setConfirmationShown(true);
    }, [params.threadId, params.forumId]);

    const handleReject = useCallback(() => {
        setConfirmationShown(false);
    }, []);

    if (thread) {

        const threadTitle = [`'${thread.title}', author '${thread.author.name}'`];
        if (thread.author.id === user.id) {
            threadTitle.push('hey, it\'s You !');
        }

        if (thread.author.isBanned) {
            threadTitle.push('banned');
        }

        const postList = posts && posts.map(post => {
            return <Post key={post.id} id={post.id} thread={thread} onReply={handleReply}/>
        });

        // TODO friendly format the message
        const confirmationText = `You are about to remove thread '${thread.title}' from forum '${params.forumId}' created by user '${thread.author.name}' ?`;

        postList.unshift(
            <div key='title'
                 className='forum-title border-1-right border-1-top border-1-left bold border-top-round-025'>
                Thread {threadTitle.join(', ')}
            </div>
        );

        const handleCreatePost = newText => {
            (async () => {
                debug('create post for thread', thread.id, newText);
                const postId = await userApi.createPost({
                    forumId: params.forumId,
                    threadId: thread.id,
                    userId: user.id,
                    text: newText
                });
                debug('created post with id:', postId);
                if (!postId) {
                    navigate(url.SIGN_IN);
                } else {
                    dispatch(fetchPosts({threadId: thread.id, page: totalPages},true));
                    setPostText('');
                }
            })();
        };

        // TODO nicify 'posts loading' message
        return (
            <>
                {(user.id === thread.author.id || user.isAdmin) ?
                    <>
                        <Button onClick={handleRemoveThread}>remove thread</Button>
                        <Confirmation
                            title='Remove thread'
                            message={confirmationText}
                            show={confirmationShown}
                            onAccept={removeCurrentThread}
                            onReject={handleReject}
                        />
                    </> : ''}
                <div className='post-list margin05'>
                    {isLoading === 'pending' ?
                        'loading posts...'
                        : (postList.length ? postList : `no posts in thread ${thread.id}`)
                    }
                </div>
                <Pagination totalPages={totalPages} currentPage={currentPage} onChange={async (page) => {
                    dispatch(fetchPosts({threadId: thread.id, page}));
                    navigate(urlToPage({forumId: params.forumId, threadId: thread.id, page}));
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