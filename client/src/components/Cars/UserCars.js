import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NewCarForm from './NewCarForm'
import { fetchUser } from '../../redux/usersSlice'
import { Grid, Box } from '@mui/material';
import UserCarCard from './UserCarCard'


const UserCars = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

    const cars = useSelector((state) => state.users.user.cars)

    const [showForm, setShowForm] = useState(false)

    function toggleCarForm() {
      setShowForm(!showForm)
  }

    const mappedCars = cars && cars.map((car) => {
        return(
            <UserCarCard 
              key={car.id}
              car={car}
            />
        )
    })

    
  return (
    <div className="ms-5 me-5 mt-3 text-center">
      <Box className="ps-5 pt-3 pb-3 mb-3 mt-5 ms-5 me-5 border border-3">
        <Grid 
          container 
          direction="row"
          alignItems="stretch"
          >
            {mappedCars}
        </Grid>
      </Box>
      
      <button className="btn btn-secondary" onClick={toggleCarForm}>Add New Car</button>
      { showForm ? <NewCarForm showForm={showForm} setShowForm={setShowForm} /> : null }
    </div>
           

  )
}

export default UserCars