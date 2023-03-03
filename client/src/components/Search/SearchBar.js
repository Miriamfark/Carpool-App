import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCars } from '../../redux/carsSlice';
import { useNavigate, createSearchParams } from "react-router-dom";
import { 
    MDBInput,
    MDBContainer,
    MDBRow,
    MDBCol
 } from 'mdb-react-ui-kit';

const SearchBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [school, setSchool] = useState("")
    const [time, setTime] = useState("")
    
    const errors = useSelector((state) => state.cars.errorMessage)
  
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
    <MDBContainer fluid> 
        <MDBRow>
            <form onSubmit={(e) => handleSearch(e)}>
            <MDBCol sm='6'>

            <MDBInput 
                label='School' 
                id='form1' 
                type='text'
                value={school}
                onChange={(e) => setSchool(e.target.value)}

            />
            </MDBCol>


           
            <MDBCol sm='6'>

            {/* <label>
                Time
                <input 
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}></input>
            </label>  */}
            </MDBCol>

            <input type="submit" value="Search"></input>  
        </form> 
        { errors ? <h5>{errors}</h5> : null}
        </MDBRow>
    </MDBContainer>
  )
  }

  export default SearchBar

  