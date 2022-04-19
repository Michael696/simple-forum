import React from 'react'
import {render, screen} from '@testing-library/react'
import ForumItem from "../src/features/forumsList/ForumItem.tsx";

test('test title', () => {
    render(<ForumItem id={1}/>);
    expect(screen.getByRole('heading')).toHaveTextContent('Welcome, John Doe');
})