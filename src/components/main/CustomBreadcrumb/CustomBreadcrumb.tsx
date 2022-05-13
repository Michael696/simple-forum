import React from "react";
import {useLocation, useParams} from "react-router";
import {Breadcrumb} from "react-bootstrap/cjs";
import {useAppDispatch} from "../../../app/hooks";

/*
import {Breadcrumb} from "react-bootstrap/cjs";
import {useAppSelector} from "../../../app/hooks";
import {forumWithId} from "../../../features/forumsList/forumsSlice";
import {threadWithId} from "../../../features/threads/threadsSlice";
import React from "react";

const breadcrumbItems: Array<JSX.Element> = [];

const pathItems = location.pathname.split('/').filter(item => item);
let forumName,threadName;

for (let idx = 0; idx < pathItems.length; idx++) {
    const proc = locationProc[pathItems[idx]];
    const active = {active: idx === pathItems.length - 1};
    if (proc) {
        const name = proc(pathItems, idx);
        idx++;
        breadcrumbItems.push(<Breadcrumb.Item key={pathItems[idx]} {...active}>{name}</Breadcrumb.Item>);
    } else {
        breadcrumbItems.push(<Breadcrumb.Item key={pathItems[idx]} {...active}>{pathItems[idx]}</Breadcrumb.Item>);
    }
}


const locationProc = {
        'forum': (all, idx) => {
            const findForum = useAppSelector(state => forumWithId(state, all[idx + 1]));
            return findForum.name;
        },
        'thread': (all, idx) => {
            const findThread = useAppSelector(state => threadWithId(state, all[idx + 1]));
            return findThread.title;
        },
    }
;
*/


export default function CustomBreadcrumb() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const params = useParams();
    // const pathItems = location.pathname.split('/').filter(item => item);


    let forumId, threadId;
    const pathItems = location.pathname.split('/').filter(item => item);
    const breadcrumbItems = pathItems.map(it => {
        return <Breadcrumb.Item key={it}>{it}</Breadcrumb.Item>
    });

    /*
        console.log('pathItems', pathItems);

        for (let idx = 0; idx < pathItems.length; idx++) {
            if (pathItems[idx] === 'forum') { // TODO link with urls
                forumId = pathItems[idx + 1];
                idx++;
            }
            if (pathItems[idx] === 'thread') { // TODO link with urls
                threadId = pathItems[idx + 1];
                idx++;
            }
        }


        let currForum, currThread;

        useEffect(() => {
            dispatch(fetchForums());
            dispatch(fetchThreads(params.forumId));
        }, []);

        console.log('forumId', forumId);
        console.log('threadId', threadId);

        currForum = useAppSelector(state => forumWithId(state, forumId));
        currThread = useAppSelector(state => threadWithId(state, threadId));
        let breadcrumbItems: Array<JSX.Element> = [];

        console.log('currForum', currForum);
        console.log('currThread', currThread);

        if (currForum && !currThread) {
            breadcrumbItems.push(<Breadcrumb.Item key={currForum.name} active>{currForum.name}</Breadcrumb.Item>);
        } else if (currForum && currThread) {
            breadcrumbItems.push(<Breadcrumb.Item key={currForum.name}>{currForum.name}</Breadcrumb.Item>);
            breadcrumbItems.push(<Breadcrumb.Item key={currThread.title} active>{currThread.title}</Breadcrumb.Item>);
        } else {
            breadcrumbItems.push(<Breadcrumb.Item key={pathItems[0]}>{pathItems[0]}</Breadcrumb.Item>);
        }
    */

    return (
        <Breadcrumb>
            {breadcrumbItems}
        </Breadcrumb>
    )
}
