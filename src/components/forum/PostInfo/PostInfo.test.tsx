/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import PostInfo from "./PostInfo";
import {PostItemType, User} from "../../../app/types";
import userEvent from '@testing-library/user-event'

test('Post info', async () => {
    const user: User = {
        id: undefined,
        isAdmin: false,
        isBanned: false,
        location: "",
        name: "",
        posts: 0,
        realName: "",
        registeredAt: ""
    };
    const post: PostItemType = {
        author: user,
        dislikes: [user, user, user], // 3
        editedAt: "",
        id: "01",
        likes: [user, user], // 2
        postedAt: "2022-02-01 12:13:14",
        text: "",
        title: ""
    };
    let likesClicked = false, dislikesClicked = false;
    const clickHandler = e => {
        switch (e.label) {
            case 'likes' :
                likesClicked = true;
                break;
            case 'dislikes' :
                dislikesClicked = true;
                break;
        }
    };
    render(
        <PostInfo post={post} onClick={clickHandler}>
            <div>children here</div>
        </PostInfo>
    );
    expect(screen.getByText(/2022-02-01 12:13:14/)).toBeInTheDocument();
    const likes = screen.getByText(/likes:2/);
    expect(likes).toBeInTheDocument();
    const dislikes = screen.getByText(/dislikes:3/);
    expect(dislikes).toBeInTheDocument();
    expect(screen.getByText(/children here/)).toBeInTheDocument();

    userEvent.click(likes);
    userEvent.click(dislikes);
    expect(likesClicked).toBe(true);
    expect(dislikesClicked).toBe(true);
});
