import React from "react";
import {LinkContainer} from 'react-router-bootstrap';
import {Id} from "../../../app/types";
import './Pagination.sass';

function PageLink({page, forumId, threadId}: { page: number, forumId: Id, threadId: Id }) {
    return (
        <LinkContainer></LinkContainer>
    )
}

export default function Pagination(
    {totalPages, perPage, currentPage, onChange, formatter}:
        { totalPages: number, perPage: number, currentPage: number, onChange: (page: number) => void, formatter: (page: number) => void }) {
    const MAX_LINKS_VISIBLE = 5; // must be odd
    const pageLinks = [];
    // TODO logic here

    return (
        <div className='custom-pagination margin05 bold'>
            <div className='custom-pagination__info margin1-left'>
                Page {currentPage} of {totalPages}
            </div>
            <div className='custom-pagination__controls margin1-right'>
                Go to page: 1 2 3 4 5 6 6 7{pageLinks}
            </div>
        </div>
    )
};