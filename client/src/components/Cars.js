import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, updateSeatsAvailable } from '../redux/carsSlice';
import NewCarForm from './NewCarForm';
import SearchBar from './Search/SearchBar';
import { deleteCarpool, postCarpool } from '../redux/carpoolsSlice';

const Cars = () => {

    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)
    const [addKidButton, setAddKidButton] = useState(false)
    const [removeKidButton, setRemoveKidButton] = useState(true)
    // let disabledButton

    useEffect(() => {
        dispatch(fetchCars())
    }, [dispatch])

    const cars = useSelector((state) => state.cars.cars)
    const kids = useSelector((state) => state.users.user.kids)

    function addKidToCar(e, kidId, carId) {
        const carpoolData ={
            kid_id: kidId,
            car_id: carId
        }
        dispatch(postCarpool(carpoolData))
        dispatch(updateSeatsAvailable(carId))
        e.currentTarget.disabled = true;

    }

    function removeKidFromCar(e, kidId, carId) {
        e.currentTarget.disabled = true;
        dispatch(deleteCarpool(carpoolId))

    }
   
    const mappedCars = cars && cars.map((car) => {
        
        const mappedKids = kids.map((kid) => {
            // if(car.kids.some(k => k.name === kid.name)) {
            //    setAddKidButton(true)
            //    setRemoveKidButton(false)
            // } else if ((car.seats_available < 1)) {
            //     setAddKidButton(true)
            // }
         return (
            <div>
                
                    <button key={kid.id} disabled={addKidButton} onClick={(e) => addKidToCar(e, kid.id, car.id)}>Add {kid.name} to this car</button>
              
                    <button key={kid.id} disabled={removeKidButton} onClick={(e) => removeKidFromCar(e, kid.id, car.id)}>Remove {kid.name} from this car</button>
                
            </div>
         )
            
        })
       
        return(
            <div key={car.id}>
                <p>Driver: {car.user && car.user.name}</p>
                <p>Seats Available: {car.seats_available}</p>
                <p>School: {car.school}</p>
                <p>Time: {car.dismissal_time}</p>
                <p>Kids in Carpool: {car.kids && car.kids.map((kid, index) => <span key={index}>{kid.name} </span>)}</p>
                <ul>
                    <h5>Days</h5>
                    { car.monday ? <p>Monday</p> : null }
                    { car.tuesday ? <p>Tuesday</p> : null }
                    { car.wednesday ? <p>Wednesday</p> : null }
                    { car.thursday ? <p>Thursday</p> : null }
                    { car.friday ? <p>Friday</p> : null }
                </ul>
                <div>
                    {mappedKids}
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
        { showForm? <NewCarForm showForm={showForm} setShowForm={setShowForm} /> : null }
    </div>
  )
}

export default Cars