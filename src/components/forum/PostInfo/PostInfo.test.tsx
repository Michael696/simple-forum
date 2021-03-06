/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {render} from '@testing-library/react'
import PostInfo from "./PostInfo";
import {PostItemType, PostStateType, User} from "../../../app/types";
import userEvent from '@testing-library/user-event'
import postsReducer, {postDislike, postLike} from "../../../features/post/postsSlice";
import currentUserReducer from "../../../features/currentUser/currentUserSlice";

test('Post info: #1 like/dislike events', async () => {
    const user: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [user, user, user],
        likes: [user, user]
    };

    const store = configureStore({
        reducer: {
            posts: postsReducer,
            currentUser: currentUserReducer
        },
        preloadedState: {
            posts: {
                postIds: [post.id],
                postData: [post],
                threadId: '1',
                firstPostIdx: 0,
                lastPostIdx: 1,
                totalCount: 1,
                isLoading: 'idle',
                lastFetch: '',
                perPageCount: 1
            },
            currentUser: {
                data: {
                    id: '01',
                    name: 'name',
                    realName: '',
                    registeredAt: '',
                    posts: 0,
                    location: '',
                    isBanned: false,
                    isAdmin: false,
                },
                isAuthPending: 'idle',
                error: ''
            }
        }
    });

    let likesClicked = false, dislikesClicked = false;
    const clickHandler = (e: any) => {
        switch (e.label) {
            case 'likes' :
                likesClicked = true;
                break;
            case 'dislikes' :
                dislikesClicked = true;
                break;
        }
    };
    const {getByText} = render(
        <Provider store={store}>
            <PostInfo post={post} user={user} onClick={clickHandler}>
                <div>children here</div>
            </PostInfo>
        </Provider>
    );
    expect(getByText(/2022-02-01 12:13:14/)).toBeInTheDocument();
    const likes = getByText(/likes:2/);
    expect(likes).toBeInTheDocument();
    const dislikes = getByText(/dislikes:3/);
    expect(dislikes).toBeInTheDocument();
    expect(getByText(/children here/)).toBeInTheDocument();

    userEvent.click(likes);
    userEvent.click(dislikes);
    expect(likesClicked).toBe(true);
    expect(dislikesClicked).toBe(true);
});


test('Post info: #2 first like', async () => {
    const user: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post = {
        id: '01',
        author: user,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [],
        likes: []
    };
    const prevState: PostStateType = {
        postIds: [post.id],
        postData: [post],
        threadId: '1',
        firstPostIdx: 0,
        lastPostIdx: 1,
        totalCount: 1,
        isLoading: 'idle',
        lastFetch: '',
        perPageCount: 1
    };

    const result = postsReducer(prevState, postLike({postId: '01', user}));
    expect(result.postData[0].likes[0]).toEqual(user);
    expect(result.postData[0].dislikes.length).toEqual(0);
});

test('Post info: #3 first dislike', async () => {
    const user: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [],
        likes: []
    };
    const prevState: PostStateType = {
        postIds: [post.id],
        postData: [post],
        threadId: '1',
        firstPostIdx: 0,
        lastPostIdx: 1,
        totalCount: 1,
        isLoading: 'idle',
        lastFetch: '',
        perPageCount: 1
    };

    const result = postsReducer(prevState, postDislike({postId: '01', user}));
    expect(result.postData[0].dislikes[0]).toEqual(user);
    expect(result.postData[0].likes.length).toEqual(0);
});

test('Post info: #4 dislike liked', async () => {
    const user: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [],
        likes: [user]
    };
    const prevState: PostStateType = {
        postIds: [post.id],
        postData: [post],
        threadId: '1',
        firstPostIdx: 0,
        lastPostIdx: 1,
        totalCount: 1,
        isLoading: 'idle',
        lastFetch: '',
        perPageCount: 1
    };

    const result = postsReducer(prevState, postDislike({postId: '01', user}));
    expect(result.postData[0].dislikes[0]).toEqual(user);
    expect(result.postData[0].likes.length).toEqual(0);
});

test('Post info: #5 like disliked', async () => {
    const user: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [user],
        likes: []
    };
    const prevState: PostStateType = {
        postIds: [post.id],
        postData: [post],
        threadId: '1',
        firstPostIdx: 0,
        lastPostIdx: 1,
        totalCount: 1,
        isLoading: 'idle',
        lastFetch: '',
        perPageCount: 1
    };

    const result = postsReducer(prevState, postLike({postId: '01', user}));
    expect(result.postData[0].likes[0]).toEqual(user);
    expect(result.postData[0].dislikes.length).toEqual(0);
});

test('Post info: #6 second like', async () => {
    const user1: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const user2: User = {
        id: '02',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user1,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [],
        likes: [user1]
    };
    const prevState: PostStateType = {
        postIds: [post.id],
        postData: [post],
        threadId: '1',
        firstPostIdx: 0,
        lastPostIdx: 1,
        totalCount: 1,
        isLoading: 'idle',
        lastFetch: '',
        perPageCount: 1
    };

    const result = postsReducer(prevState, postLike({postId: '01', user: user2}));
    expect(result.postData[0].likes[0]).toEqual(user1);
    expect(result.postData[0].likes[1]).toEqual(user2);
    expect(result.postData[0].dislikes.length).toEqual(0);
});

test('Post info: #7 second dislike', async () => {
    const user1: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const user2: User = {
        id: '02',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user1,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [user1],
        likes: []
    };
    const prevState: PostStateType = {
        postIds: [post.id],
        postData: [post],
        threadId: '1',
        firstPostIdx: 0,
        lastPostIdx: 1,
        totalCount: 1,
        isLoading: 'idle',
        lastFetch: '',
        perPageCount: 1
    };

    const result = postsReducer(prevState, postDislike({postId: '01', user: user2}));
    expect(result.postData[0].dislikes[0]).toEqual(user1);
    expect(result.postData[0].dislikes[1]).toEqual(user2);
    expect(result.postData[0].likes.length).toEqual(0);
});


test('Post info: #8 n-th like', async () => {
    const user1: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const user2: User = {
        id: '02',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const user3: User = {
        id: '03',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user1,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [user2],
        likes: [user1]
    };
    const prevState: PostStateType = {
        postIds: [post.id],
        postData: [post],
        threadId: '1',
        firstPostIdx: 0,
        lastPostIdx: 1,
        totalCount: 1,
        isLoading: 'idle',
        lastFetch: '',
        perPageCount: 1
    };

    const result = postsReducer(prevState, postLike({postId: '01', user: user3}));
    expect(result.postData[0].likes[0]).toEqual(user1);
    expect(result.postData[0].likes[1]).toEqual(user3);
    expect(result.postData[0].likes.length).toEqual(2);
    expect(result.postData[0].dislikes[0]).toEqual(user2);
    expect(result.postData[0].dislikes.length).toEqual(1);
});


test('Post info: #9 like/dislike events disabled for unauthenticated user', async () => {
    const user: User = {
        id: '01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };

    const post: PostItemType = {
        id: '01',
        author: user,
        text: '',
        postedAt: '2022-02-01 12:13:14',
        editedAt: '',
        dislikes: [user, user, user],
        likes: [user, user],
    };

    const store = configureStore({
        reducer: {
            posts: postsReducer,
            currentUser: currentUserReducer
        },
        preloadedState: {
            posts: {
                postIds: [post.id],
                postData: [post],
                threadId: '1',
                firstPostIdx: 0,
                lastPostIdx: 1,
                totalCount: 1,
                isLoading: 'idle',
                lastFetch: '',
                perPageCount: 1
            },
            currentUser: {
                data: {
                    id: '',
                    name: '',
                    realName: '',
                    registeredAt: '',
                    posts: 0,
                    location: '',
                    isBanned: false,
                    isAdmin: false,
                },
                isAuthPending: 'idle',
                error: ''
            }
        }
    });

    let likesClicked = false, dislikesClicked = false;
    const clickHandler = (e: any) => {
        switch (e.label) {
            case 'likes' :
                likesClicked = true;
                break;
            case 'dislikes' :
                dislikesClicked = true;
                break;
        }
    };
    const {getByText} = render(
        <Provider store={store}>
            <PostInfo post={post} user={user} onClick={clickHandler}>
                <div>children here</div>
            </PostInfo>
        </Provider>
    );
    expect(getByText(/2022-02-01 12:13:14/)).toBeInTheDocument();
    const likes = getByText(/likes:2/);
    expect(likes).toBeInTheDocument();
    const dislikes = getByText(/dislikes:3/);
    expect(dislikes).toBeInTheDocument();
    expect(getByText(/children here/)).toBeInTheDocument();

    userEvent.click(likes);
    userEvent.click(dislikes);
    expect(likesClicked).toBe(false);
    expect(dislikesClicked).toBe(false);
});
