import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterCars } from '../../redux/carsSlice';
import { useNavigate, createSearchParams } from "react-router-dom";



const SearchBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [school, setSchool] = useState("")
    const [time, setTime] = useState("")
  
    const params = { 
        school: `${school}`, 
        dismissal_time: `${time}`, 
    };

    function handleSearch(e) {
        e.preventDefault()
        navigate({
            pathname: `/search`,
            search: `/?${createSearchParams(params)}`,
          });
          dispatch(filterCars(params))
          setSchool("")
          setTime("")
        }
    

  return (
    <div>
        <form onSubmit={(e) => handleSearch(e)}>
            <label>
                School
                <input 
                type="search"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </label>
            <label>
                Time
                <input 
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}></input>
            </label> 
            <input type="submit" value="Search"></input>  
        </form> 
    </div>
  )
  }

export default SearchBar