import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    
    return (
        <div className='parentForm'>
            <Link to='/home' className='linkNav'>Home</Link>
            <Link to='/home/form' className='linkNav'>Form</Link>
        </div>
    );
};

export default Nav