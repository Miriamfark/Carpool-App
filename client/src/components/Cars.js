import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../redux/carsSlice';
import NewCarForm from './NewCarForm';

const Cars = () => {

    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(fetchCars())
    }, [dispatch])

    const cars = useSelector((state) => state.cars.cars)
    console.log(cars)

    const mappedCars = cars && cars.map((car) => {
        return(
            <div key={car.id}>
                <p>Driver: {car.user.name}</p>
                <p>Seats Available: {car.seats_available}</p>
                <p>School: {car.school}</p>
                <p>Time: {car.dismissal_time}</p>
                <button>Join carpool</button>
            </div>
        )
    })

    function toggleCarForm() {
        setShowForm(!showForm)
    }

  return (
    <div>
        <h1>Cars</h1>
        <ul>
            {mappedCars}
        </ul>
        <button onClick={toggleCarForm}>Add New Car</button>
        { showForm? <NewCarForm showForm={showForm} setShowForm={setShowForm} /> : null }
    </div>
  )
}

export default Cars