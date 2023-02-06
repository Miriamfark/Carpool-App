import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postCar } from '../redux/carsSlice';
import { fetchUser } from '../redux/usersSlice';

const NewCarForm = ({ showForm, setShowForm }) => {

    const user = useSelector((state) => state.users.user)
    const dispatch = useDispatch()

    // const [formData, setFormData] = useState({
    //     driver: user.name,
    //     school: 
    // })

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
        console.log(seatsAvailable)
        dispatch(postCar(carData))
        setDriver("")
        setSchool("")
        setSeatsAvailable(0)
        setTime("")
        setShowForm(!showForm)
        //is the fetchUser working? when add a car it does not update the UserInfo component without a refresh
        dispatch(fetchUser())
    }
//handleChange(e){
    //setFormData( {…formData,
        //[e.target.name]: e.target.value
  // })
//}
  return (
    <div>
        <form onSubmit={handleAddCar}>
            <div>
                <label>Driver</label>
                <input 
                name="driver"
                type="text"
                defaultValue={user.name}
                //handle change take in event and setFormData({...formData, })
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
            <div>
                <h5>Days</h5>
                <input type="checkbox" id="Monday" name="Monday" value="Monday" onChange={() => setMonday(!monday)} />
                <label for="Monday"> Monday</label> 
                <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday" onChange={() => setTuesday(!tuesday)} />
                <label for="Tuesday"> Tuesday</label>
                <input type="checkbox" id="Wednesday" name="Wednesday" value="Wednesday" onChange={() => setWednesday(!wednesday)} />
                <label for="Wednesday"> Wednesday</label>
                <input type="checkbox" id="Thursday" name="Thursday" value="Thursday" onChange={() => setThursday(!thursday)} />
                <label for="Thursday"> Thursday</label> 
                <input type="checkbox" id="Friday" name="Friday" value="Friday" onChange={() => setFriday(!friday)} />
                <label for="Friday"> Friday</label>
            </div>
            
            <input type="submit"></input>
        </form>
    </div>
  )
}
//days handle change with conditional logic if checked true if unchecked false - ternary? array of days of week
export default NewCarForm