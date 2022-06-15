import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {addPost, fetchPosts, selectPosts, selectTotalPages} from "./postsSlice";
import {Id, PostItemType, User} from "../../app/types";
import Post from "./Post";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import NewPostForm from "../../components/forum/NewPostForm/NewPostForm";
import {selectCurrentUser, selectIsUserAuthenticated} from "../currentUser/currentUserSlice";
import Button from "react-bootstrap/cjs/Button";
import {addThreadViewCount, fetchThreads, removeThread, selectThreadWithId} from "../threads/threadsSlice";
import StatusHintMessage from "../../components/forum/StatusHintMessage/StatusHintMessage";
import {url, urlToPage} from "../../app/urls";
import Pagination from "../../components/forum/Pagination/Pagination";
import {debug} from "../../app/helpers";
import {fetchBanned} from "../bannedUsers/bannedUsersSlice";
import Confirmation from "../../components/main/Confirmation/Confirmation";

export default function Posts() {
    const params = useParams();
    const posts: Array<Id> = useAppSelector(selectPosts);
    const user: User = useAppSelector(selectCurrentUser);
    const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
    const dispatch = useAppDispatch();
    const [postText, setPostText] = useState('');
    const thread = useAppSelector(state => selectThreadWithId(state, params.threadId || ''));
    const navigate = useNavigate();
    const totalPages = useAppSelector(selectTotalPages);
    const currentPageDraft = parseInt(params.page || '1');
    const currentPage = (Number.isNaN(currentPageDraft) || currentPageDraft < 1) ? 1 : currentPageDraft;
    const [confirmationShown, setConfirmationShown] = useState(false);

    // TODO correctly handle the case when page specified in url is greater than real totalCount
    useEffect(() => {
        if (user.isAdmin) {
            dispatch(fetchBanned());
        }
    }, [user.isAdmin, dispatch]);

    useEffect(() => {
        if (thread && thread.id) {
            dispatch(addThreadViewCount(thread.id));
        }
    }, [thread, dispatch]);

    useEffect(() => {
        dispatch(fetchThreads(params.forumId || ''));
    }, [dispatch, params.forumId]);

    useEffect(() => {
        dispatch(fetchPosts({threadId: params.threadId || '', page: currentPage}));
        debug('current page is (from params):', params.page);
        debug('current page is (sane):', currentPage);
        debug('totalPages', totalPages);
        if (params.page !== currentPage.toString()) {
            debug('pages are different, redirecting to', currentPage);
            navigate(urlToPage({forumId: params.forumId || '', threadId: params.threadId || '', page: currentPage}));
        }
    }, [totalPages, currentPage, params.forumId, params.page, params.threadId, dispatch, navigate]); // so many deps !?


    const removeCurrentThread = useCallback(() => {
        setConfirmationShown(false);
        debug('removing thread ', params.threadId);
        dispatch(removeThread(params.threadId));
        navigate(`${url.FORUM}/${params.forumId}`);
    }, [params.threadId, params.forumId, dispatch, navigate]);

    const handleRemoveThread = useCallback(() => {
        setConfirmationShown(true);
    }, []);

    const handleReject = useCallback(() => {
        setConfirmationShown(false);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        if (thread) {
            dispatch(fetchPosts({threadId: thread.id, page}));
            navigate(urlToPage({forumId: params.forumId || '', threadId: thread.id, page}));
        }
    }, [dispatch, navigate, params.forumId, thread]);


    const handleCreatePost = useCallback((text: string) => {
        if (thread && params.forumId) {
            dispatch(addPost({text, userId: user.id, forumId: params.forumId, threadId: thread.id}));
            setPostText('');
        }
    }, [dispatch, user.id, thread, params.forumId]);


    const threadTitle = [`'${thread.title}', author '${thread.author.name}'`];
    if (isAuthenticated && thread.author.id === user.id) {
        threadTitle.push('hey, it\'s You !');
    }

    if (isAuthenticated && thread.author.isBanned) {
        threadTitle.push('banned');
    }

    const postList = posts && posts.map(post => {
        const handleReply = (post: PostItemType) => {
            debug('reply to', post);
            const text = `user '${post.author.name}' wrote at ${post.postedAt}:\r\n` + // TODO refactor to separate entity
                `===========================\r\n` +
                `${post.text}\r\n` +
                `===========================\r\n`;
            debug('reply text', text);
            setPostText(text);
            window.scrollTo(0, document.body.scrollHeight); // scroll to bottom
        };

        return <Post key={post} id={post} threadId={thread.id} onReply={handleReply}/>
    });

    // TODO friendly format the message
    const confirmationText = `You are about to remove thread '${thread.title}' from forum '${params.forumId}' created by user '${thread.author.name}' ?`;

    const postsHeader = (
        <div key='title'
             className='forum-title border-1-right border-1-top border-1-left bold border-top-round-025'>
            Thread {threadTitle.join(', ')}
        </div>
    );

    // TODO nicify 'posts loading' message
    return (
        <>
            {(isAuthenticated && (user.id === thread.author.id || user.isAdmin)) ?
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
                {postsHeader}
                {postList}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onChange={handlePageChange}/>
            <StatusHintMessage>
                <NewPostForm text={postText} onCreate={handleCreatePost}/>
            </StatusHintMessage>
        </>
    );
}