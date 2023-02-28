import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../../redux/carsSlice';
import CarCard from './CarCard';
import NewCarForm from './NewCarForm';
import SearchBar from '../Search/SearchBar';
import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Cars = () => {

    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)

    const { cars, loading } = useSelector((state) => state.cars)
    const kids = useSelector((state) => state.users.user.kids)

    useEffect(() => {
        dispatch(fetchCars())
    }, [cars.length, dispatch, loading])
   
    const mappedCars = cars && cars.map((car) => {
        return(
        <Grid item style={{display: 'flex'}}>
            <CarCard car={car} kids={kids}/>
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
        <Button onClick={toggleCarForm}>Add New Car</Button>
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