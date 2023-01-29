import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postCar } from '../redux/carsSlice';
import { fetchUser } from '../redux/usersSlice';

const NewCarForm = ({ showForm, setShowForm }) => {

    const user = useSelector((state) => state.users.user)
    const dispatch = useDispatch()

    const [driver, setDriver] = useState(user.name)
    const [school, setSchool] = useState("")
    const [seatsAvailable, setSeatsAvailable] = useState(0)
    const [time, setTime] = useState("")

    function handleAddCar(e) {
        e.preventDefault()
        const carData = {
            driver,
            school,
            seats_available: seatsAvailable,
            dismissal_time: time
        }
        console.log(seatsAvailable)
        dispatch(postCar(carData))
        setDriver("")
        setSchool("")
        setSeatsAvailable(0)
        setTime("")
        setShowForm(!showForm)
        dispatch(fetchUser())
    }

  return (
    <div>
        <form onSubmit={handleAddCar}>
            <div>
                <label>Driver</label>
                <input 
                type="text"
                defaultValue={user.name}
                onChange={(e) => setDriver(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Seats Available</label>
                <input
                type="number"
                value={seatsAvailable}
                onChange={(e) => setSeatsAvailable(e.target.value)}
                ></input>
            </div>
            <div>
                <label>School</label>
                <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Time</label>
                <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                ></input>
            </div>
            <input type="submit"></input>
        </form>
    </div>
  )
}

export default NewCarForm