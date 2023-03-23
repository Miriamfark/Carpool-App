import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../../redux/carsSlice';
import CarCard from './CarCard';
import NewCarForm from './NewCarForm';
import SearchBar from '../Search/SearchBar';
import { Box, Grid } from '@mui/material';

const Cars = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCars())
    }, [dispatch])

    const [showForm, setShowForm] = useState(false)

    const cars = useSelector((state) => state.cars)
    const kids = useSelector((state) => state.users.user.kids)
   
    const mappedCars = cars.cars && cars.cars.map((car) => {
        return(
        <Grid key={car.id} item style={{display: 'flex'}}>
            <CarCard 
            car={car} 
            kids={kids}
            />
        </Grid>  
        )
    })

    function toggleCarForm() {
        setShowForm(!showForm)
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
        

        <div>
            <SearchBar /> 
        </div>
        <div className="d-grid gap-2 col-6 mx-auto mb-5">
            <button className="align-center btn btn-primary" onClick={toggleCarForm}>Add New Car</button>   
        </div>
        
        { showForm ? <NewCarForm showForm={showForm} setShowForm={setShowForm} /> : null }
        <Grid 
        container 
        spacing={4}
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        >
            {mappedCars}
        </Grid>
    </Box>
  )
}

export default Cars