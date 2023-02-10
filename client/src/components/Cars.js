import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../redux/carsSlice';
import NewCarForm from './NewCarForm';
import SearchBar from './Search/SearchBar';
import { deleteCarpool, postCarpool } from '../redux/carpoolsSlice';

const Cars = () => {

    const dispatch = useDispatch()
    const errorMessageCarpool = useSelector(state => state.carpools.errorMessage)
    const errorMessageSearch = useSelector(state => state.cars.errorMessage)

    const [showForm, setShowForm] = useState(false)
    const [addKidButton, setAddKidButton] = useState(false)
    const [removeKidButton, setRemoveKidButton] = useState(false)

    const cars = useSelector((state) => state.cars.cars)
    const kids = useSelector((state) => state.users.user.kids)

    useEffect(() => {
        dispatch(fetchCars())
    }, [dispatch])

    function addKidToCar(e, kidId, carId) {
        const carpoolData = {
            kid_id: kidId,
            car_id: carId
        }
        dispatch(postCarpool(carpoolData))
        // dispatch()
        e.currentTarget.disabled = true;
        //how do I make page refresh?
    }

    function removeKidFromCar(e, kidId, carId) {
        const carpoolData = {
            kid_id: kidId,
            car_id: carId
        }
        e.currentTarget.disabled = true;
        dispatch(deleteCarpool(carpoolData))

    }
   
    const mappedCars = cars && cars.map((car) => {
        
        const mappedKids = kids.map((kid) => {
          
         return (
            <div>
                
                    <button key={kid.id} disabled={addKidButton} onClick={(e) => addKidToCar(e, kid.id, car.id)}>Add {kid.name} to this car</button>
              
                    <button key={kid.id} disabled={removeKidButton} onClick={(e) => removeKidFromCar(e, kid.id, car.id)}>Remove {kid.name} from this car</button>
                
            </div>
         )
            
        })

        const time = car.dismissal_time && car.dismissal_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

       
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
                </div>
                { errorMessageCarpool && <p>{errorMessageCarpool}</p>}
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
        { errorMessageSearch && <p>{errorMessageSearch}</p>}
        <ul>
            {mappedCars}
        </ul>
        <button onClick={toggleCarForm}>Add New Car</button>
        { showForm? <NewCarForm showForm={showForm} setShowForm={setShowForm} /> : null }
    </div>
  )
}

export default Cars