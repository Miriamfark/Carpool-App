import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, addKidToCarpool } from '../../redux/carsSlice';
import NewCarForm from './NewCarForm';
import SearchBar from '../Search/SearchBar';

const Cars = () => {

    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)

    const cars = useSelector((state) => state.cars.cars)
    const kids = useSelector((state) => state.users.user.kids)

    useEffect(() => {
        dispatch(fetchCars())
    }, [dispatch])

    function addKidToCar(kidId, carId) {
        const carpoolData = {
            kid_id: kidId,
            car_id: carId,
            status: "pending"
        }
        fetch('/carpools', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(carpoolData)
                })
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    return data                
                }
            })
        dispatch(addKidToCarpool(carpoolData))
    }

    function removeKidFromCar(kidId, carId) {
        const carpoolData = {
            kid_id: kidId,
            car_id: carId
        }
        fetch(`/carpools/delete`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(carpoolData) })
            
            .then((r) => r.json())
            .then((data) => console.log(data))
    }
   
    const mappedCars = cars && cars.map((car) => {
        
        const mappedKids = kids && kids.map((kid) => {
         return  <button key={kid.id} onClick={(e) => addKidToCar(kid.id, car.id)}>Add {kid.name} to this car</button>   
        })
        
        const time = car.dismissal_time && car.dismissal_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        const mappedCarKids = car.kids.map((kid) => {
            if(kids && kids.find(k => k.id === kid.id)) {
            return <button key={kid.id} onClick={(e) => removeKidFromCar(kid.id, car.id)}>Remove {kid.name} from this car</button> 
            }
         })
       
        return(
            <div key={car.id}>
                <p>Driver: {car.user && car.user.name}</p>
                <p>Seats Available: {car.seats_available}</p>
                <p>School: {car.school}</p>
                <p>Time: {time}</p>
                <p>Kids in Carpool: {car.kids && car.kids.map((kid, index) => <span key={index}>{kid.name} </span>)}</p>
                <ul>
                    <h5>Days</h5>
                    { car.monday === "monday" ? <p>Monday</p> : null }
                    { car.tuesday === "tuesday" ? <p>Tuesday</p> : null }
                    { car.wednesday === "wednesday" ? <p>Wednesday</p> : null }
                    { car.thursday === "thursday" ? <p>Thursday</p> : null }
                    { car.friday === "friday" ? <p>Friday</p> : null }
                </ul>
                <div>
                     {mappedKids}
                    {mappedCarKids}
                </div>
            </div>
        )
    })

    function toggleCarForm() {
        setShowForm(!showForm)
    }

  return (
    <div>
        <div>
            <SearchBar />    
        </div>
        <ul>
            {mappedCars}
        </ul>
        <button onClick={toggleCarForm}>Add New Car</button>
        { showForm ? <NewCarForm showForm={showForm} setShowForm={setShowForm} /> : null }
    </div>
  )
}

export default Cars