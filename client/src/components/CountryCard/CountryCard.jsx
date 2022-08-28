import React from 'react';
import { Link } from 'react-router-dom'
import './CountryCard.css'

const CountryCard = ({flags, flag, name, continents, cca3}) => {
    
    return (
        <div className='parentCard'>
            <div className='containerCard'>
                <Link to={`/home/countries/${cca3}`}> <h1>{name}</h1> </Link>
                <img src={flags} alt={flag} className='imageCard'/>
                <p>Continent: {continents[0]}</p>
                <br />
                <br />
            </div>
        </div>
    );
};

export default CountryCard