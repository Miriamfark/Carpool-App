import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { searchCars } from '../redux/carsSlice';
import { useNavigate, createSearchParams } from "react-router-dom";



const SearchBar = () => {

    // const dispatch = useDispatch()
    const navigate = useNavigate()

    const [driver, setDriver] = useState("")
    const [school, setSchool] = useState("")
    const [time, setTime] = useState("")
    const [monday, setMonday] = useState("")
    const [tuesday, setTuesday] = useState("")
    const [wednesday, setWednesday] = useState("")
    const [thursday, setThursday] = useState("")
    const [friday, setFriday] = useState("")

    const params = { 
        user: `${driver}`,
        school: `${school}`, 
        dismissal_time: `${time}`, 
        monday: `${monday}`,
        tuesday: `${tuesday}`,
        wednesday: `${wednesday}`,
        thursday: `${thursday}`,
        friday: `${friday}`
    };



    function handleSearch(e) {
        e.preventDefault()
        navigate({
            pathname: `/search`,
            search: `/?${createSearchParams(params)}`,
          });
        }
    

  return (
    <div>
        <form onSubmit={(e) => handleSearch(e)}>
            <label>
                Driver
                <input 
                type="search"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                ></input>
            </label>
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
            {/* <label>
                Seats Available
                <input 
                type="search"
                value={seatsAvailable}
                onChange={(e) => setSeatsAvailable(e.target.value)}></input>
            </label>            */}
            <label>
                Search By Day
                <input type="checkbox" id="Monday" name="Monday" value="Monday" onChange={() => setMonday(!monday)} />
                <label for="Monday"> Monday</label> 
                <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday" onChange={() => setTuesday(!tuesday)} />
                <label for="Tuesday"> Tuesday</label>
                <input type="checkbox" id="Wednesday" name="Wednesday" value="Wednesday" onChange={() => setWednesday(!wednesday)} />
                <label for="Wednesday"> Wednesday</label>
                <input type="checkbox" id="Thursday" name="Thursday" value="Thursday" onChange={() => setThursday(!thursday)} />
                <label for="Thursday"> Thursday</label> 
                <input type="checkbox" id="Friday" name="Friday" value="Friday" onChange={() => setFriday(!friday)} />
                <label for="Friday"> Friday</label>
            </label> 
            <input type="submit" value="Search"></input>  
        </form> 
    </div>
  )
  }

export default SearchBar