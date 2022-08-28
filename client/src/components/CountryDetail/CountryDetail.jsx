import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetail } from '../../redux/actions';
import './CountryDetail.css'

const CountryDetail = (props) => {

    let { id } = props.match.params

    let dispatch = useDispatch();

    let countryDetail = useSelector(state => state.countryDetail)

    React.useEffect(() => {
        dispatch(getCountryDetail(id))
    },[])

    return (
        <div className='parentDetail'>
            {console.log(countryDetail)}
            <h1>{countryDetail.name}</h1>
            <img src={countryDetail.flags} alt={countryDetail.flag}/>
            <h5>Capital: {countryDetail.capital?countryDetail.capital[0]:'No capital'}</h5>
            <h5>Subregion: {countryDetail.subregion?countryDetail.subregion: 'No subregion'}</h5>
            <h5>Area: {countryDetail.area}</h5>
            <h5>Population: {countryDetail.population}</h5>
        </div>
    );
};

export default CountryDetail