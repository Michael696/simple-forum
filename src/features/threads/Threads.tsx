import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {addThreadViewCount, fetchThreads, threadsList} from "./threadsSlice";
import {ForumItemType, ThreadItemType, User} from "../../app/types";
import {AppDispatch} from "../../app/store";
import ThreadItem from "./ThreadItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {currentUser, isUserAuthenticated} from "../currentUser/currentUserSlice";
import {url} from "../../app/urls";
import Button from "react-bootstrap/cjs/Button";
import {forumWithId} from "../forumsList/forumsSlice";

function CreateThreadButton({isAuthenticated, isBanned, onClick}: { isAuthenticated: boolean, isBanned: boolean, onClick: (e: any) => void }) {
    return <>{(isAuthenticated && !isBanned) ? <Button onClick={onClick}>create thread</Button> : null}</>
}

export default function Threads() {
    const params = useParams();
    const navigate = useNavigate();
    const threads: Array<ThreadItemType> = useAppSelector(threadsList);
    const dispatch: AppDispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const user: User = useAppSelector(currentUser);
    const forum: ForumItemType = useAppSelector(state => forumWithId(state, params.forumId));

    useEffect(() => {
        dispatch(fetchThreads(params.forumId));
    }, []);

    const handleNewThread = () => {
        console.log(`create new thread auth=${isAuthenticated} forumId=${params.forumId}`);
        if (isAuthenticated) {
            navigate(`${url.NEW_THREAD + '/' + params.forumId}`);
        } else {
            navigate(url.SIGN_IN);
        }
    };

    let threadList: Array<any> = [];
    if (threads) {
        threadList = threads.map(thread => {
            const linkTo = `${url.FORUM}/${params.forumId}${url.THREAD}/${thread.id}`;
            const addView = () => { // TODO add views to thread by following a direct link
                dispatch(addThreadViewCount(thread.id));
            };
            return (
                <Link to={linkTo} key={thread.id} className='link-as-text' onClick={addView}>
                    <ThreadItem key={thread.id} id={thread.id}/>
                </Link>);
        });
        threadList.unshift(
            <div className='threads__header' key='title'>
                <div className='cell-variable flex-direction-vertical center pad05'>
                    Forums
                </div>
                <div className='cell-constant flex-center-horizontal center pad05'>Author</div>
                <div className='cell-constant flex-center-horizontal center pad05'>Posts</div>
                <div className='cell-constant flex-center-horizontal center pad05'>Views</div>
                <div className='cell-constant flex-direction-vertical center flex-center-horizontal pad05'> Last
                    message
                </div>
            </div>
        );
    }

    return (
        <div className='threads margin05'>
            {forum && <div
                className='forum-title border-1-gray-right border-1-gray-top border-1-gray-left bold border-top-round025'>Forum {forum.name}</div>}
            {/*<CreateThreadButton isAuthenticated={isAuthenticated} isBanned={user.isBanned} onClick={handleNewThread}/>*/}
            {threadList.length ? threadList : <div>no threads in forum {params.forumId}</div>}
            <CreateThreadButton isAuthenticated={isAuthenticated} isBanned={user.isBanned} onClick={handleNewThread}/>
        </div>
    );
}