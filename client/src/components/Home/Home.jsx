import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterValue, getAllCountries } from '../../redux/actions';
import CountryCard from '../CountryCard/CountryCard.jsx';
import Pagination from '../Pagination/Pagination';
import './Home.css'

const Home = () => {

    let [currentPage, setCurrentPage] = useState(1)
    let [currentCountries, setCurrentCountries] = useState(250)

    let dispatch = useDispatch()
    
    let countries = useSelector(state => state.countries)

    let filters = useSelector(state => state.filters)

    React.useEffect(() => {
        dispatch(getAllCountries())
    },[])

    React.useEffect(() => {
        setCurrentCountries(
            filters.searchTerm===''?250:
                countries.filter((val) => {
                    if(filters.searchTerm === '') {
                        return val
                    }
                    else if (val.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
                        return val
                    }
                }).length
        )
    },[filters])

    let handleChange = (event) => {
        setCurrentPage(1)
        dispatch(changeFilterValue({[event.target.name]:event.target.value}))
    }   

    return (
        <div className='parentHome'>
            List of Countries:
            <div>
                <input type="text" placeholder='Search...' name='searchTerm' onChange={(e) => handleChange(e)} className='search' value={filters.searchTerm}/>
            </div>

            <div>
                <Pagination currentPage={currentPage} total={currentCountries} limit={10} onPageChange={(page) => setCurrentPage(page)}/>
            </div>
            {
                countries && countries
                    .filter((val) => {
                        if(filters.searchTerm === '') {
                            return val
                        }
                        else if (val.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
                            return val
                        }
                    })
                    .slice(currentPage*10-10, currentPage*10)
                    .map(c => (
                        <CountryCard key={c.cca3} cca3={c.cca3} name={c.name} continents={c.continents} flag={c.flag} flags={c.flags}/>
                        ))
                    }
        </div>
    );
};

export default Home