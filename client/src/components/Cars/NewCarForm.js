import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postCar } from '../../redux/carsSlice';
import { showUserCar } from '../../redux/usersSlice';

const NewCarForm = ({ showForm, setShowForm }) => {

    const user = useSelector((state) => state.users.user)
    const dispatch = useDispatch()


    const [driver, setDriver] = useState(user.name)
    const [school, setSchool] = useState("")
    const [seatsAvailable, setSeatsAvailable] = useState(0)
    const [time, setTime] = useState("")
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)

    function handleAddCar(e) {
        e.preventDefault()
        const carData = {
            driver,
            school,
            seats_available: seatsAvailable,
            dismissal_time: time,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday
        }
        dispatch(postCar(carData))
        dispatch(showUserCar(carData))
        setDriver("")
        setSchool("")
        setSeatsAvailable(0)
        setTime("")
        setShowForm(!showForm)
    }

  return (
    <div className="mt-5 mb-3 pe-5">
        <form onSubmit={handleAddCar}>
            <div>
                <label>Driver</label>
                <input 
                className="form-control"
                name="driver"
                type="text"
                defaultValue={user.name}
                onChange={(e) => setDriver(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Seats Available</label>
                <input
                                className="form-control"

                type="number"
                value={seatsAvailable}
                onChange={(e) => setSeatsAvailable(e.target.value)}
                ></input>
            </div>
            <div>
                <label>School</label>
                <input
                                className="form-control"

                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Time</label>
                <input
                                className="form-control"

                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                ></input>
            </div>
            <div className="pt-3 form-check text-start">
            <h6>Days:</h6>
                <input                     
                className="form-check-input" 
                type="checkbox" 
                id="Monday" 
                name="Monday" 
                value="Monday" 
                onChange={() => setMonday("monday")} />
                <label for="Monday"> Monday</label> 
                <br/>

                <input                     
                className="form-check-input" 
                type="checkbox" 
                id="Tuesday" 
                name="Tuesday" 
                value="Tuesday" 
                onChange={() => setTuesday("tuesday")} />
                <label for="Tuesday"> Tuesday</label>
                <br/>

                <input                     
                className="form-check-input" 
                type="checkbox" 
                id="Wednesday" 
                name="Wednesday" 
                value="Wednesday" 
                onChange={() => setWednesday("wednesday")} />
                <label for="Wednesday"> Wednesday</label>
                <br/>

                <input                     
                className="form-check-input" 
                type="checkbox" 
                id="Thursday" 
                name="Thursday" 
                value="Thursday" 
                onChange={() => setThursday("thursday")} />
                <label for="Thursday"> Thursday</label> 
                <br/>

                <input                     
                className="form-check-input" 
                type="checkbox" 
                id="Friday" 
                name="Friday" 
                value="Friday" 
                onChange={() => setFriday("friday")} />
                <label for="Friday"> Friday</label>
            </div>
            
            <input className="btn btn-primary" type="submit"></input>
        </form>
    </div>
  )
}

export default NewCarForm