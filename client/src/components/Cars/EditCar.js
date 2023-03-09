import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCar } from '../../redux/carsSlice';
import { updateUserCar } from '../../redux/usersSlice';

const EditCar = ({ cars }) => {

    const id = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const car = cars && cars.filter((car) => car.id == id.carId)[0]
    console.log(car)

    const [school, setSchool] = useState(car && car.school)
    const [seatsAvailable, setSeatsAvailable] = useState(car && car.seats_available)
    const [time, setTime] = useState(car && car.dismissal_time)
    const [monday, setMonday] = useState(car && car.monday)
    const [tuesday, setTuesday] = useState(car && car.tuesday)
    const [wednesday, setWednesday] = useState(car && car.wednesday)
    const [thursday, setThursday] = useState(car && car.thursday)
    const [friday, setFriday] = useState(car && car.friday)

    console.log(monday, tuesday, wednesday, thursday, friday)

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

    // function defaultCheck() {
    //     const checked1 =  car && car.monday === "monday" ? document.getElementById("Monday").checked = true : null 
    //     const checked2 =  car && car.tuesday === "tuesday" ? document.getElementById("Tuesday").checked = true : null 
    //     const checked3 =  car && car.wednesday === "wednesday" ? document.getElementById("Wednesday").checked = true : null 
    //     const checked4 =  car && car.thursday === "thursday" ? document.getElementById("Thursday").checked = true : null 
    //     const checked5 =  car && car.friday === "friday" ? document.getElementById("Friday").checked = true : null 
    // }
    // defaultCheck()

  return (
    <div className="mt-5 mb-3 pe-5">
        <form onSubmit={handleUpdateCar}>
        <div>
                <label>Seats Available</label>
                <input
                className="form-control"
                type="number"
                defaultValue={car && car.seats_available}
                onChange={(e) => setSeatsAvailable(e.target.value)}
                ></input>
            </div>
            <div>
                <label>School</label>
                <input
                className="form-control"
                type="text"
                defaultValue={car && car.school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Time</label>
                <input
                className="form-control"
                type="time"
                defaultValue={car && car.dismissal_time}
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
                    onChange={() => {
                        if(car.monday === "monday") {
                           setMonday("unchecked") 
                        } else {
                            setMonday("monday")
                        }
                    }} />
                <label 
                    className="form-check-label" 
                    for="Monday"> Monday</label> 
                <br/>
                <input
                    className="form-check-input" 
                    type="checkbox" 
                    id="Tuesday" 
                    name="Tuesday" 
                    value="Tuesday" 
                    onChange={() => {
                        if(car.tuesday === "tuesday") {
                            setTuesday("unchecked") 
                         } else {
                             setTuesday("tuesday")
                         }
                    }} />
                <label 
                    className="form-check-label" 
                    for="Tuesday"> Tuesday</label>
                <br />
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="Wednesday" 
                    name="Wednesday" 
                    value="Wednesday" 
                    onChange={() => {
                        if(car.wednesday === "wednesday") {
                            setWednesday("unchecked") 
                         } else {
                             setWednesday("wednesday")
                         }
                    }} />
                <label 
                    className="form-check-label" 
                    for="Wednesday"> Wednesday</label>
                <br/>
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="Thursday" 
                    name="Thursday" 
                    value="Thursday" 
                    onChange={() => {
                        if(car.thursday === "thursday") {
                            setThursday("unchecked") 
                         } else {
                             setThursday("thursday")
                         }
                    }} />                <label 
                    className="form-check-label" 
                    for="Thursday"> Thursday</label> 
                <br/>
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="Friday" 
                    name="Friday" 
                    value="Friday"
                    onChange={() => {
                        if(car.friday === "friday") {
                            setFriday("unchecked") 
                         } else {
                             setFriday("wednesday")
                         }
                    }} />                <label 
                    className="form-check-label" 
                    for="Friday"> Friday</label>
            </div>
            
            <input className="btn btn-primary" type="submit" value="Save Changes"></input>
        </form>
    </div>
  )
}

export default EditCar