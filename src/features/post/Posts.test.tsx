/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {setupServer} from "msw/node";
import {rest} from 'msw';
import currentUserReducer, {checkAuth} from "../currentUser/currentUserSlice";
import {url} from "../../app/urls";
import {User} from "../../app/types";
import postsReducer from '../../features/post/postsSlice';
import Posts from "./Posts";
import threadsReducer from "../threads/threadsSlice";

test('Posts: should show no buttons for non-authenticated user ', async () => {
    const user: User = {
        id: 'u01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "user01",
        posts: 0,
        realName: "",
        registeredAt: ""
    };
    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/posts', (req, res, ctx) => {
            return res(
                ctx.json([{
                        id: 'p01',
                        threadId: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'post 1 title',
                        text: 'post 1 long text',
                        likes: [],
                        dislikes: [],
                        postedAt: '2022-04-05T13:19:13',
                        editedAt: '2022-04-05T13:19:15',
                    }]
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/threads', ((req, res, context) => {
            return res(
                context.json([{
                        id: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'forum id1 thread title 1',
                        postCount: 10,
                        viewCount: 123,
                        likes: [],
                        dislikes: [],
                        lastMessage: {
                            dateTime: '2022-03-03T16:18:20', user
                        },
                    }]
                )
            );
        }))
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
            return res(
                context.status(401),
            );
        }))
    );

    server.listen();

    const store = configureStore({
        reducer: {
            threads: threadsReducer,
            posts: postsReducer,
            currentUser: currentUserReducer,
        },
    });

    await checkAuth()(store.dispatch);

    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`${url.FORUM}/f01/thread/t01`]}>
                    <Routes>
                        <Route path={`${url.FORUM}/:forumId/thread/:threadId`} element={<Posts/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    expect(await screen.queryByText(/^reply$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^remove$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^edit$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^create post$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^remove thread$/)).not.toBeInTheDocument();
    server.close();
});

test('Posts: current user regular - should show "reply", "edit", "remove"  for own posts', async () => {
    const user: User = {
        id: 'u01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "user01",
        posts: 0,
        realName: "",
        registeredAt: ""
    };
    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/posts', (req, res, ctx) => {
            return res(
                ctx.json([{
                        id: 'p01',
                        threadId: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'post 1 title',
                        text: 'post 1 long text',
                        likes: [],
                        dislikes: [],
                        postedAt: '2022-04-05T13:19:13',
                        editedAt: '2022-04-05T13:19:15',
                    }]
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/threads', ((req, res, context) => {
            return res(
                context.json([{
                        id: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'forum id1 thread title 1',
                        postCount: 10,
                        viewCount: 123,
                        likes: [],
                        dislikes: [],
                        lastMessage: {
                            dateTime: '2022-03-03T16:18:20', user
                        },
                    }]
                )
            );
        }))
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
            return res(
                context.json({
                        id: 'u01',
                        name: 'user01',
                        realName: '',
                        registeredAt: '',
                        eMail: '',
                        posts: 0,
                        location: '',
                        isBanned: false
                    }
                )
            );
        }))
    );

    server.listen();

    const store = configureStore({
        reducer: {
            threads: threadsReducer,
            posts: postsReducer,
            currentUser: currentUserReducer,
        },
    });

    await checkAuth()(store.dispatch);

    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`${url.FORUM}/f01/thread/t01`]}>
                    <Routes>
                        <Route path={`${url.FORUM}/:forumId/thread/:threadId`} element={<Posts/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    expect(await screen.findByText(/^reply$/)).toBeInTheDocument();
    expect(await screen.findByText(/^remove$/)).toBeInTheDocument();
    expect(await screen.findByText(/^edit$/)).toBeInTheDocument();
    expect(await screen.findByText(/^create post$/)).toBeInTheDocument();
    expect(await screen.findByText(/^remove thread$/)).toBeInTheDocument();
    server.close();
});

test('Posts: current user regular - should show "reply" for other posts', async () => {
    const user: User = {
        id: 'u01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "user01",
        posts: 0,
        realName: "",
        registeredAt: ""
    };
    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/posts', (req, res, ctx) => {
            return res(
                ctx.json([{
                        id: 'p01',
                        threadId: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'post 1 title',
                        text: 'post 1 long text',
                        likes: [],
                        dislikes: [],
                        postedAt: '2022-04-05T13:19:13',
                        editedAt: '2022-04-05T13:19:15',
                    }]
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/threads', ((req, res, context) => {
            return res(
                context.json([{
                        id: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'forum id1 thread title 1',
                        postCount: 10,
                        viewCount: 123,
                        likes: [],
                        dislikes: [],
                        lastMessage: {
                            dateTime: '2022-03-03T16:18:20', user
                        },
                    }]
                )
            );
        }))
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
            return res(
                context.json({
                    id: 'u02',
                    name: 'user02',
                        realName: '',
                        registeredAt: '',
                        eMail: '',
                        posts: 0,
                        location: '',
                    isBanned: false,
                    isAdmin: false
                    }
                )
            );
        }))
    );

    server.listen();

    const store = configureStore({
        reducer: {
            threads: threadsReducer,
            posts: postsReducer,
            currentUser: currentUserReducer,
        },
    });

    await checkAuth()(store.dispatch);

    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`${url.FORUM}/f01/thread/t01`]}>
                    <Routes>
                        <Route path={`${url.FORUM}/:forumId/thread/:threadId`} element={<Posts/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    expect(await screen.findByText(/^reply$/)).toBeInTheDocument();
    expect(await screen.queryByText(/^remove$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^edit$/)).not.toBeInTheDocument();
    expect(await screen.findByText(/^create post$/)).toBeInTheDocument();
    expect(await screen.queryByText(/^remove thread$/)).not.toBeInTheDocument();
    server.close();
});

test('Posts: current user regular (banned) - should show no buttons', async () => {
    const user: User = {
        id: 'u01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "user01",
        posts: 0,
        realName: "",
        registeredAt: ""
    };
    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/posts', (req, res, ctx) => {
            return res(
                ctx.json([{
                        id: 'p01',
                        threadId: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'post 1 title',
                        text: 'post 1 long text',
                        likes: [],
                        dislikes: [],
                        postedAt: '2022-04-05T13:19:13',
                        editedAt: '2022-04-05T13:19:15',
                    }]
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/threads', ((req, res, context) => {
            return res(
                context.json([{
                        id: 't01',
                        forumId: 'f01',
                        author: user,
                        title: 'forum id1 thread title 1',
                        postCount: 10,
                        viewCount: 123,
                        likes: [],
                        dislikes: [],
                        lastMessage: {
                            dateTime: '2022-03-03T16:18:20', user
                        },
                    }]
                )
            );
        }))
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
            return res(
                context.json({
                        id: 'u02',
                        name: 'user02',
                        realName: '',
                        registeredAt: '',
                        eMail: '',
                        posts: 0,
                        location: '',
                        isBanned: true,
                        isAdmin: false
                    }
                )
            );
        }))
    );

    server.listen();

    const store = configureStore({
        reducer: {
            threads: threadsReducer,
            posts: postsReducer,
            currentUser: currentUserReducer,
        },
    });

    await checkAuth()(store.dispatch);

    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`${url.FORUM}/f01/thread/t01`]}>
                    <Routes>
                        <Route path={`${url.FORUM}/:forumId/thread/:threadId`} element={<Posts/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    expect(await screen.queryByText(/^reply$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^remove$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^edit$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^create post$/)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^remove thread$/)).not.toBeInTheDocument();
    server.close();
});

test('Posts: current user is admin - should show "reply", "edit", "remove" and admin panel buttons', async () => {
    const user1: User = {
        id: 'u01',
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "user01",
        posts: 0,
        realName: "",
        registeredAt: ""
    };
    const userAdmin: User = {
        id: 'uAd',
        isAdmin: true,
        isBanned: false,
        location: "",
        name: "userAd",
        posts: 0,
        realName: "",
        registeredAt: ""
    };
    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/posts', (req, res, ctx) => {
            return res(
                ctx.json([{
                        id: 'p01',
                        threadId: 't01',
                        forumId: 'f01',
                        author: user1,
                        title: 'post 1 title',
                        text: 'post 1 long text',
                        likes: [],
                        dislikes: [],
                        postedAt: '2022-04-05T13:19:13',
                        editedAt: '2022-04-05T13:19:15',
                    }]
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/threads', ((req, res, context) => {
            return res(
                context.json([{
                        id: 't01',
                        forumId: 'f01',
                        author: user1,
                        title: 'forum id1 thread title 1',
                        postCount: 10,
                        viewCount: 123,
                        likes: [],
                        dislikes: [],
                        lastMessage: {
                            dateTime: '2022-03-03T16:18:20', user1
                        },
                    }]
                )
            );
        }))
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
            return res(
                context.json(userAdmin)
            );
        }))
    );

    server.listen();

    const store = configureStore({
        reducer: {
            threads: threadsReducer,
            posts: postsReducer,
            currentUser: currentUserReducer,
        },
    });

    await checkAuth()(store.dispatch);

    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`${url.FORUM}/f01/thread/t01`]}>
                    <Routes>
                        <Route path={`${url.FORUM}/:forumId/thread/:threadId`} element={<Posts/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    expect(await screen.findByText(/^reply$/)).toBeInTheDocument();
    expect(await screen.findByText(/^remove$/)).toBeInTheDocument();
    expect(await screen.findByText(/^edit$/)).toBeInTheDocument();
    expect(await screen.findByText(/^create post$/)).toBeInTheDocument();
    expect(await screen.findByText(/^remove thread$/)).toBeInTheDocument();
    expect(await screen.findByText(/^user01 banned$/)).toBeInTheDocument();
    server.close();
});
