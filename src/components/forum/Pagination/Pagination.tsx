import React from "react";
import './Pagination.sass';
import {limit} from "../../../app/helpers";

// Accessible pagination
// https://www.a11ymatters.com/pattern/pagination/

function PageLink({page, onClick, isCurrent}: { page: number, className?: string, isCurrent: boolean, onClick: (p: number) => void }) {
    return (
        <a
            {...(isCurrent ? {className: 'current-page-link margin025'} : {className: 'margin025'})}
            key={page}
            href={`${page}`}
            aria-label={isCurrent ? `Current page, Page ${page}` : `Goto Page ${page}`}
            aria-current={isCurrent}
            onClick={
                (e) => {
                    e.preventDefault();
                    !isCurrent && onClick(page);
                }}
        >
            {page}
        </a>
    )
}

export default function Pagination({totalPages, currentPage, onChange}:
                                       { totalPages: number, currentPage: number, onChange: (page: number) => void }) {
    const MAX_LINKS_VISIBLE = 5; // must be odd ?
    const pageLinks: Array<JSX.Element> = [];

    // currentPage = currentPage > totalPages ? totalPages : (currentPage < 1 ? 1 : currentPage); // range limiting
    currentPage = limit(currentPage, 1, totalPages);

    if (totalPages > MAX_LINKS_VISIBLE + 2) {
        pageLinks.push(
            <PageLink
                key={1}
                page={1}
                isCurrent={currentPage === 1}
                onClick={() => {
                    onChange(1);
                }}
            />
        );

        let start = currentPage - (MAX_LINKS_VISIBLE - 1) / 2;
        // start = start < 2 ? 2 : (start > totalPages - MAX_LINKS_VISIBLE ? totalPages - MAX_LINKS_VISIBLE : start);
        start = limit(start, 2, totalPages - MAX_LINKS_VISIBLE);

        if (start > 2) {
            pageLinks.push(<span key='first'>...</span>);
        }

        let idx;
        for (idx = start; idx < start + MAX_LINKS_VISIBLE; idx++) {
            pageLinks.push(
                <PageLink
                    key={idx}
                    page={idx}
                    isCurrent={currentPage === idx}
                    onClick={
                        ((idx) => () => {
                            onChange(idx)
                        })(idx)
                    }
                />
            );

        }

        if (idx <= totalPages - 1) {
            pageLinks.push(<span key='second'>...</span>);
        }

        pageLinks.push(
            <PageLink
                key={totalPages}
                page={totalPages}
                isCurrent={currentPage === totalPages}
                onClick={() => {
                    onChange(totalPages);
                }}
            />
        );

    } else {
        for (let i = 1; i <= totalPages; i++) {
            pageLinks.push(
                <PageLink
                    key={i}
                    page={i}
                    isCurrent={currentPage === i}
                    onClick={() => {
                        onChange(i);
                    }}
                />
            );
        }
    }

    return (
        <div className='custom-pagination margin05 bold'>
            <div className='custom-pagination__info margin1-left'>
                Page {currentPage} of {totalPages}
            </div>
            <nav
                className='custom-pagination__controls margin1-right'
                role='navigation'
                aria-label='Pagination Navigation'
            >
                Go to page: {pageLinks}
            </nav>
        </div>
    )
};