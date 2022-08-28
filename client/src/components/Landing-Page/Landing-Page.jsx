import React from 'react';
import { Link } from 'react-router-dom'
import './Landing-Page.css'

const Landing = () => {
    
    return (
        <div className='parent'>
            Landing Page
            <Link to='/home'> Home </Link>
        </div>
    );
};

export default Landing