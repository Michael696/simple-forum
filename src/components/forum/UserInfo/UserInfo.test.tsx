/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import UserInfo from "./UserInfo";

test('User info', async () => {
    render(<UserInfo user={{
        id: '',
        name: 'username1',
        realName: 'real username1',
        registeredAt: '2022-02-01 12:13:14',
        posts: 123,
        location: '',
        isBanned: true,
        isAdmin: false
    }}/>);
    expect(screen.getByText(/username1/)).toBeInTheDocument();
    expect(screen.getByText(/banned/)).toBeInTheDocument();
    expect(screen.getByText(/regular/)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/2022-02-01 12:13:14/)).toBeInTheDocument();
});
