import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getAllCountries } from '../../redux/actions';
import './Form.css'

const Form = () => {
    
    
    let [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: []
    })

    let [errors, setErrors] = useState({
        name: ''
    })

    let [selectedCountries, setSelectedCountries] = useState([])

    let dispatch = useDispatch()
    
    let countries = useSelector(state => state.countries)

    React.useEffect(() => {
        dispatch(getAllCountries())
    },[])

    React.useEffect(() => {
        console.log(input)
    },[input])

    React.useEffect(() => {
        console.log(selectedCountries)
    },[selectedCountries])

    let handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createActivity({
            ...input,
            season: input.season.join(', ')
        }))
    }

    let handleClick = (e) => {
        if (!selectedCountries.includes(e.target.value) && e.target.value !== '') {
            setSelectedCountries([...selectedCountries, e.target.value])
        }
        
    }

    let handleClickCountries = (e) => {
        if(selectedCountries.includes(e.target.value)) {
            setSelectedCountries(
                selectedCountries.filter(s => {return s !== e.target.value})
            )
        }
    }
    
    let handleClickCheck = (e) => {
        if (e.target.checked && !input.season.includes(e.target.value)) {
            setInput({
                ...input,
                season: [...input.season, e.target.value]
            })
        }
        else if (!e.target.checked && input.season.includes(e.target.value)) {
            setInput({
                ...input,
                season: input.season.filter(s => {return s !== e.target.value})
            })
        }
    }

    let handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label className='labelForm'>Name:</label>
                <input type="text" name='name' value={input.name} onChange={(e) => handleChange(e)}/>
                <label className='labelForm'>Difficulty:</label>
                <select name='difficulty' onChange={(e) => handleChange(e)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label className='labelForm'>Duration (hours):</label>
                <input type="number" name='duration' value={input.duration} onChange={(e) => handleChange(e)}/>
                <label className='labelForm'>season:</label>
                <label>Summer</label>
                <input type="checkbox" value='summer' onClick={(e) => handleClickCheck(e)} />
                <label>Autumn</label>
                <input type="checkbox" value='autumn' onClick={(e) => handleClickCheck(e)}/>
                <label>Winter</label>
                <input type="checkbox" value='winter' onClick={(e) => handleClickCheck(e)}/>
                <label>Spring</label>
                <input type="checkbox" value='spring' onClick={(e) => handleClickCheck(e)}/>
                <label className='labelForm'>Add Country</label>
                <select onClick={(e) => handleClick(e)}>
                    <option value=''>select countries</option>
                    {
                        countries && countries.map(c => {
                            return (
                                <option name='selectCountries' value={c.name} key={c.cca3}>
                                    {c.name}
                                </option>
                            )
                        })
                    }
                </select>
                <input type="submit" />
            </form>
            <div>
                    {
                        selectedCountries.map(s => {
                            if (s.length > 0) return (
                                <button key={s} className='buttonCountries' value={s} onClick={(e) => handleClickCountries(e)}>
                                    {s}
                                </button>
                            )
                        })
                    }
            </div>
        </div>
    );
};

export default Form