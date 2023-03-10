import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCars } from '../../redux/carsSlice';
import { useNavigate, createSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    <Container>
        <Row>
            <form onSubmit={(e) => handleSearch(e)}>
                <Col>
                    <label>Search By School</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    ></input>
             
                </Col>
                <Col>
                    <label>Search By Time</label>
                    <input
                        className="form-control"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    ></input>
                </Col>
                <Col>
                    <input className="mt-2 btn btn-outline-secondary" type="submit" value="Search"></input>
                </Col>  
            </form>
            { errors ? <h5>{errors}</h5> : null}
        </Row>
    </Container>  
)}

  export default SearchBar

  