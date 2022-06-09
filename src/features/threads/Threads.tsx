import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {fetchThreads, selectThreads} from "./threadsSlice";
import {ThreadItemType, User} from "../../app/types";
import {AppDispatch} from "../../app/store";
import ThreadItem from "./ThreadItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCurrentUser, selectIsUserAuthenticated} from "../currentUser/currentUserSlice";
import {url, urlToPage} from "../../app/urls";
import Button from "react-bootstrap/cjs/Button";
import {selectForumWithId} from "../forumsList/forumsSlice";
import {postsClear} from '../post/postsSlice';
import {debug} from "../../app/debug";

function CreateThreadButton({isAuthenticated, isBanned, onClick}: { isAuthenticated: boolean, isBanned: boolean, onClick: (e: any) => void }) {
    return <>{(isAuthenticated && !isBanned) ? <Button onClick={onClick}>create thread</Button> : null}</>
}

export default function Threads() {
    const params = useParams();
    const navigate = useNavigate();
    const threads: Array<ThreadItemType> = useAppSelector(selectThreads);
    const dispatch: AppDispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
    const user: User = useAppSelector(selectCurrentUser);
    const forum = useAppSelector(state => selectForumWithId(state, params.forumId || ''));

    useEffect(() => {
        dispatch(postsClear());
        dispatch(fetchThreads(params.forumId || ''));
    }, [params.forumId]);

    const handleNewThread = () => {
        debug(`create new thread auth=${isAuthenticated} forumId=${params.forumId}`);
        if (isAuthenticated) {
            navigate(`${url.NEW_THREAD + '/' + params.forumId}`);
        } else {
            navigate(url.SIGN_IN);
        }
    };

    let threadList: Array<any> = [];
    if (threads) {
        threadList = threads.map(thread => {
            const linkTo = urlToPage({forumId: params.forumId || '', threadId: thread.id, page: 1});
            return (
                <Link to={linkTo} key={thread.id} className='link-as-text'>
                    <ThreadItem key={thread.id} id={thread.id}/>
                </Link>);
        });
        threadList.unshift(
            <div className='threads__header' key='title'>
                <div className='border-1 width-100 flex-direction-vertical center pad05'>
                    Forums
                </div>
                <div className='border-1 flex-center-horizontal center pad05'>Author</div>
                <div className='border-1 flex-center-horizontal center pad05'>Posts</div>
                <div className='border-1 flex-center-horizontal center pad05'>Views</div>
                <div className='border-1 flex-direction-vertical center flex-center-horizontal pad05'> Last
                    message
                </div>
            </div>
        );
    }

    return (
        <div className='threads margin05'>
            {forum && <div
                className='forum-title border-1-right border-1-top border-1-left bold border-top-round-025'>Forum {forum.name}</div>}
            {/*<CreateThreadButton isAuthenticated={isAuthenticated} isBanned={user.isBanned} onClick={handleNewThread}/>*/}
            {threadList.length ? threadList : <div>no threads in forum {params.forumId}</div>}
            <CreateThreadButton isAuthenticated={isAuthenticated} isBanned={user.isBanned}
                                onClick={handleNewThread}/>
        </div>
    );
}