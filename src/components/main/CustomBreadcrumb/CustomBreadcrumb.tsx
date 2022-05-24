import React, {useEffect} from "react";
import {useLocation} from "react-router";
import {LinkContainer} from 'react-router-bootstrap';
import {Breadcrumb} from "react-bootstrap/cjs";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchForums, forumWithId} from "../../../features/forumsList/forumsSlice";
import {fetchThreads, threadWithId} from "../../../features/threads/threadsSlice";
import {ForumItemType, ThreadItemType} from "../../../app/types";
import './CustomBreadcrumb.sass';
import {url} from '../../../app/urls';

export default function CustomBreadcrumb() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    let currForum: ForumItemType, currThread: ThreadItemType, currPage: string;
    let forumId, threadId;
    const pathItems = location.pathname.split('/').filter(item => item);
    const breadcrumbItems: Array<{ name: string, href: string }> = [];

    console.log('pathItems', pathItems);

    // TODO need to reconstruct all breadcrumb subsystem !  but ok for now...

    if (pathItems.length) {
        for (let idx = 0; idx < pathItems.length; idx++) {
            if (pathItems[idx] === url.FORUM.substring(1)) { // strip first slash
                forumId = pathItems[idx + 1];
                idx++;
            } else if (pathItems[idx] === url.THREAD.substring(1)) {
                threadId = pathItems[idx + 1];
                idx++;
            } else {
                breadcrumbItems.push({name: pathItems[idx], href: ''});
            }
        }
    } else {
        breadcrumbItems.push({name: 'Forums', href: ''});
    }

    currForum = useAppSelector(state => forumWithId(state, forumId));
    currThread = useAppSelector(state => threadWithId(state, threadId));

    useEffect(() => {
        dispatch(fetchForums());
        if (forumId) {
            dispatch(fetchThreads(forumId));
        }
    }, []);

    // console.log('currForum', JSON.stringify(currForum));
    // console.log('currThread', JSON.stringify(currThread));

    if (currForum && currForum.name) {
        breadcrumbItems.push({name: currForum.name, href: `${url.FORUM}/${forumId}`})
    }
    if (currThread && currThread.title) {
        breadcrumbItems.push({name: currThread.title, href: `${url.FORUM}/${forumId}/${url.THREAD}/${threadId}`});
    }

    return (
        <div className='main__breadcrumb pad05 bold'>
            {
                breadcrumbItems.map((it, index, all) => {
                    if (index === all.length - 1) {
                        return <Breadcrumb.Item as='div' key={it.name} active>{it.name}</Breadcrumb.Item>
                    } else {
                        return <Breadcrumb.Item as='div' href={it.href} key={it.name}>
                            <LinkContainer to={it.href}>
                                <span>{it.name}</span>
                            </LinkContainer>
                        </Breadcrumb.Item>
                    }
                })
            }
        </div>
    )
}
