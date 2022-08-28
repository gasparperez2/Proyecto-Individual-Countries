import React from "react"
import './Pagination.css'

const range = (end) => {
    return [...Array(end).keys()].map((el) => el + 1)
}

const PaginationItem = ({ page, currentPage, onPageChange }) => {
    return (
        <li className={`page-item ${ page === currentPage ? 'active' : '' }`} onClick={() => onPageChange(page)}>
            <span className='page-link'>{page}</span>
        </li>
    )
}

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
    const pagesCount = Math.ceil( total/limit )
    const pages = range(pagesCount)
    return (
        <ul className="pagination">
            {
                pages.map(page => (
                    <PaginationItem page={page} key={page} currentPage={currentPage} onPageChange={onPageChange}/>
                ))
            }    
        </ul>
    )
}

export default Pagination