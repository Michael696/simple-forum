/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import {setupServer} from "msw/node";
import {rest} from 'msw';
import {configureStore} from '@reduxjs/toolkit'
import currentUserReducer, {checkAuth} from "../../../features/currentUser/currentUserSlice";
import StatusHintMessage from "./StatusHintMessage";
import {Provider} from "react-redux";
import {userApi} from "../../../app/userApi";

test('StatusHintMessage: #1 anonymous user - should show nothing', async () => {

    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
                return res(
                    context.status(401))
            })
        ));

    const store = configureStore({
        reducer: {
            currentUser: currentUserReducer,
        },
    });

    server.listen();

    //@ts-ignore
    await checkAuth()(store.dispatch, store.getState, {userApi});

    render(
        <Provider store={store}>
            <StatusHintMessage>
                <div>children block</div>
            </StatusHintMessage>
        </Provider>
    );

    const emptyDiv = await screen.queryByText(/^$/, {selector: 'div'});
    expect(emptyDiv).toBeInTheDocument();

    server.close();
});

test('StatusHintMessage: #2 regular non-banned user - should show childrens', async () => {

    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
                return res(
                    context.json({
                        id: 'u01',
                        isAdmin: false,
                        isBanned: false,
                        location: "",
                        name: "user01",
                        posts: 0,
                        realName: "",
                        registeredAt: ""
                    })
                )
            })
        ));

    const store = configureStore({
        reducer: {
            currentUser: currentUserReducer,
        },
    });

    server.listen();

    //@ts-ignore
    await checkAuth()(store.dispatch, store.getState, {userApi});

    render(
        <Provider store={store}>
            <StatusHintMessage>
                <div>children block</div>
            </StatusHintMessage>
        </Provider>
    );

    expect(await screen.findByText(/^children block$/)).toBeInTheDocument();

    server.close();
});

test('StatusHintMessage: #3 regular banned user - should show warning', async () => {

    const server = setupServer(
        rest.post('http://127.0.0.1:1337/api/current-user', ((req, res, context) => {
                return res(
                    context.json({
                        id: 'u01',
                        isAdmin: false,
                        isBanned: true,
                        location: "",
                        name: "user01",
                        posts: 0,
                        realName: "",
                        registeredAt: ""
                    })
                )
            })
        ));

    const store = configureStore({
        reducer: {
            currentUser: currentUserReducer,
        },
    });

    server.listen();

    //@ts-ignore
    await checkAuth()(store.dispatch, store.getState, {userApi});

    render(
        <Provider store={store}>
            <StatusHintMessage>
                <div>children block</div>
            </StatusHintMessage>
        </Provider>
    );

    const blocks = await screen.findAllByText(/.*/);
    expect(blocks[2]).toHaveClass('error-message');

    server.close();
});