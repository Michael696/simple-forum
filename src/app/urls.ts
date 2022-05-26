import {Id} from "./types";

export const url = {
    SIGN_IN: '/sign-in',
    SIGN_OUT: '/sign-out',
    REGISTER: '/register',
    FORUM: '/forum',
    THREAD: '/thread',
    NEW_THREAD: '/new-thread'
};

export function urlToPage({forumId, threadId, page}: { forumId: Id, threadId: Id, page: number }) {
    return `${url.FORUM}/${forumId}${url.THREAD}/${threadId}/${page}`;
}