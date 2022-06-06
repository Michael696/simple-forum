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
import Threads from "./Threads";
import threadsReducer from "./threadsSlice";
import forumsReducer from "../forumsList/forumsSlice";
import currentUserReducer, {checkAuth} from "../currentUser/currentUserSlice";
import {url} from "../../app/urls";
import {User} from "../../app/types";
import onlineUsersReducer from "../onlineUsers/onlineUsersSlice";

test('Threads: has threads in forum', async () => {
    const user: User = {
        id: '', isAdmin: false, isBanned: false, location: "", name: "", posts: 0, realName: "", registeredAt: ""
    };
    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/threads', (req, res, ctx) => {
            return res(
                ctx.json(
                    [
                        {
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
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/forums', (req, res, ctx) => {
            return res(
                ctx.json(
                    [
                        {
                            id: 'f01',
                            name: 'forum1',
                            description: 'forum1 long description',
                            themeCount: 10,
                            postCount: 100,
                            lastMessage: {
                                dateTime: '2022-01-01T12:13:14', user
                            }
                        }
                    ]
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/online-users', ((req, res, context) => {
            return res(
                context.json([])
            );
        }))
    );

    server.listen();

    const store = configureStore({
        reducer: {
            onlineUsers: onlineUsersReducer,
            forums: forumsReducer,
            threads: threadsReducer,
            currentUser: currentUserReducer,
        },
    });

    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`${url.FORUM}/f01`]}>
                    <Routes>
                        <Route path={`${url.FORUM}/:forumId`} element={<Threads/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    expect(await screen.findByText(/forum id1 thread title 1/)).toBeInTheDocument();
    expect(await screen.findByText(/10/)).toBeInTheDocument();
    expect(await screen.findByText(/123/)).toBeInTheDocument();
    expect(await screen.findByText(/2022-03-03T16:18:20/)).toBeInTheDocument();
    server.close();
});

test('Threads: should show "create thread" button for authenticated and not banned user ', async () => {
    const user: User = {
        id: '', isAdmin: false, isBanned: false, location: "", name: "", posts: 0, realName: "", registeredAt: ""
    };
    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/threads', (req, res, ctx) => {
            return res(
                ctx.json([{
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
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
            return res(
                context.json({
                        id: '02',
                        name: 'user2',
                        realName: ' user2 real name',
                        registeredAt: '2001-01-01',
                        eMail: 'mailB@mail.su',
                        posts: 888,
                        location: 'home',
                        isBanned: false
                    }
                )
            );
        }))
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/forums', (req, res, ctx) => {
            return res(
                ctx.json(
                    [
                        {
                            id: 'f01',
                            name: 'forum1',
                            description: 'forum1 long description',
                            themeCount: 10,
                            postCount: 100,
                            lastMessage: {
                                dateTime: '2022-01-01T12:13:14', user
                            }
                        }
                    ]
                ),
            )
        }),
    );

    server.use(
        rest.post('http://127.0.0.1:1337/api/online-users', ((req, res, context) => {
            return res(
                context.json([])
            );
        }))
    );

    server.listen();

    const store = configureStore({
        reducer: {
            onlineUsers: onlineUsersReducer,
            forums: forumsReducer,
            threads: threadsReducer,
            currentUser: currentUserReducer,
        },
    });

    await checkAuth()(store.dispatch);

    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`${url.FORUM}/f01`]}>
                    <Routes>
                        <Route path={`${url.FORUM}/:forumId`} element={<Threads/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    expect(await screen.findByText(/create thread/)).toBeInTheDocument();
    server.close();
});
