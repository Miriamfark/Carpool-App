import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NewCarForm from './NewCarForm'
import { deleteCar, fetchCars } from '../../redux/carsSlice'

const UserCars = () => {

    const cars = useSelector((state) => state.users.user.cars)

    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
      dispatch(fetchCars())
    }, [dispatch, cars?.length])

    function toggleCarForm() {
      setShowForm(!showForm)
  }

    const mappedCars = cars && cars.map((car) => {
        return(
                <div key={car.id}>
                <p>Driver: {car.user && car.user.name}</p>
                <p>School: {car.school}</p>
                <p>Seats: {car.seats_available}</p>
                <p>Time: {car.dismissal_time}</p>
                <p>Kids in Carpool: {car.kids && car.kids.map((kid, index) => <span key={index}>{kid.name} </span>)}</p>
                <ul>
                    <h5>Days</h5>
                    { car.monday === "monday" ? <p>Monday</p> : null }
                    { car.tuesday === "tuesday" ? <p>Tuesday</p> : null }
                    { car.wednesday === "wednesday" ? <p>Wednesday</p> : null }
                    { car.thursday === "thursday" ? <p>Thursday</p> : null }
                    { car.friday === "friday" ? <p>Friday</p> : null }
                </ul>
                <Link to={`${car.id}`}>Edit</Link>
            <button onClick={() =>dispatch(deleteCar(car.id))}>Remove</button>
            
            </div>
        )
    })

    
  return (
    <div>
      {mappedCars}
      <Outlet /> 
      <button onClick={toggleCarForm}>Add New Car</button>
      { showForm ? <NewCarForm showForm={showForm} setShowForm={setShowForm} /> : null }

    </div>
           

  )
}

export default UserCars