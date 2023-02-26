import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCar } from '../../redux/carsSlice';
import { updateUserCar } from '../../redux/usersSlice';

const EditCar = ({ cars }) => {

    const id = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const car = cars.filter((car) => car.id == id.carId)[0]

    const [school, setSchool] = useState(car.school)
    const [seatsAvailable, setSeatsAvailable] = useState(car.seats_available)
    const [time, setTime] = useState(car.dismissal_time)
    const [monday, setMonday] = useState(car.monday)
    const [tuesday, setTuesday] = useState(car.tuesday)
    const [wednesday, setWednesday] = useState(car.wednesday)
    const [thursday, setThursday] = useState(car.thursday)
    const [friday, setFriday] = useState(car.friday)


    function handleUpdateCar(e) {
        e.preventDefault()
        const updatedCar = {
            id: id.carId,
            school,
            dismissal_time: time,
            seats_available: seatsAvailable,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday
        }
        dispatch(updateCar(updatedCar))
        dispatch(updateUserCar(updatedCar))
        navigate('/my_cars')
    }

  return (
    <div>
        <form onSubmit={handleUpdateCar}>
        <div>
                <label>Seats Available</label>
                <input
                type="number"
                defaultValue={car.seats_available}
                onChange={(e) => setSeatsAvailable(e.target.value)}
                ></input>
            </div>
            <div>
                <label>School</label>
                <input
                type="text"
                defaultValue={car.school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Time</label>
                <input
                type="time"
                defaultValue={car.dismissal_time}
                onChange={(e) => setTime(e.target.value)}
                ></input>
            </div>
            <div>
                <h5>Days</h5>
                <input type="checkbox" id="Monday" name="Monday" value="Monday" onChange={() => setMonday("monday")} />
                <label for="Monday"> Monday</label> 
                <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday" onChange={() => setTuesday("tuesday")} />
                <label for="Tuesday"> Tuesday</label>
                <input type="checkbox" id="Wednesday" name="Wednesday" value="Wednesday" onChange={() => setWednesday("wednesday")} />
                <label for="Wednesday"> Wednesday</label>
                <input type="checkbox" id="Thursday" name="Thursday" value="Thursday" onChange={() => setThursday("thursday")} />
                <label for="Thursday"> Thursday</label> 
                <input type="checkbox" id="Friday" name="Friday" value="Friday" onChange={() => setFriday("friday")} />
                <label for="Friday"> Friday</label>
            </div>
            
            <input type="submit" value="Edit"></input>
        </form>
    </div>
  )
}

export default EditCar