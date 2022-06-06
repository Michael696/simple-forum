/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom';
import {findByLabelText, queryByLabelText, render, screen} from '@testing-library/react'
import Pagination from "./Pagination";
import userEvent from '@testing-library/user-event'

test('Pagination: 0 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={0} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 1 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Current page, Page 1$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 2$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 3$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 4$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 7$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 8$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 9$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 1 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={1} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 1 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Current page, Page 1$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 2$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 3$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 4$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 7$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 8$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 9$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 2 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={2} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 2 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 2$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 3$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 4$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 7$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 8$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 9$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 3 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={3} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 3 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 2$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 3$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 4$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 7$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 8$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 9$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 4 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={4} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 4 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 2$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 3$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 4$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 7$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 8$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 9$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 5 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={5} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 5 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 2$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 3$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 4$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 7$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 8$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 9$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 6 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={6} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 6 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 2$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 3$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 4$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 6$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 7$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 8$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 9$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 7 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={7} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 7 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 2$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 3$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 4$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 7$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 8$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 9$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 8 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={8} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 8 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 2$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 3$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 4$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 7$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 8$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 9$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 9 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={9} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 9 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 2$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 3$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 4$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 7$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 8$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 9$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 10$/)).toBeInTheDocument();
});

test('Pagination: 10 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={10} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 10 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 2$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 3$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 4$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 7$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 8$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 9$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 10$/)).toBeInTheDocument();
});

test('Pagination: 11 of 10 pages', async () => {
    const onChange = () => {
    };
    render(<Pagination totalPages={10} currentPage={11} onChange={onChange}/>);
    expect(await screen.findByText(/^Page 10 of 10$/)).toBeInTheDocument();
    const selector = await screen.findByRole(/^navigation/);
    expect(await findByLabelText(selector, /^Goto Page 1$/)).toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 2$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 3$/)).not.toBeInTheDocument();
    expect(await queryByLabelText(selector, /^Goto Page 4$/)).not.toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 5$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 6$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 7$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 8$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Goto Page 9$/)).toBeInTheDocument();
    expect(await findByLabelText(selector, /^Current page, Page 10$/)).toBeInTheDocument();
});

test('Pagination: click current page', async () => {
    let clicked = 0;
    const onChange = (page) => {
        clicked = page;
    };
    render(<Pagination totalPages={10} currentPage={1} onChange={onChange}/>);
    userEvent.click(await screen.findByLabelText(/^Current page, Page 1$/));
    expect(clicked).toBe(0);
});

test('Pagination: click another page', async () => {
    let clicked = 0;
    const onChange = (page) => {
        clicked = page;
    };
    render(<Pagination totalPages={10} currentPage={1} onChange={onChange}/>);
    userEvent.click(await screen.findByLabelText(/^Goto Page 2$/));
    expect(clicked).toBe(2);
});
