import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchCars } from '../../redux/carsSlice';


const CarCard = ({ car, kids }) => {

    const dispatch = useDispatch()

    function addKidToCar(kid, carId) {
        const carpoolData = {
            kid_id: kid.id,
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
                    dispatch(fetchCars())
                }
            })
    }

    function removeKidFromCar(kid, carId) {
        const carpoolData = {
            kid_id: kid.id,
            car_id: carId
        }
        fetch(`/carpools/delete`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(carpoolData) })
            
            .then((r) => r.json())
            .then((data) => {
                dispatch(fetchCars())
            })
    }

    const mappedKids = kids && kids.map((kid) => {
        return  <button className="btn btn-outline-primary btn-sm" key={kid.id} onClick={() => addKidToCar(kid, car.id)}>Add {kid.name}</button>   
       })
       
       const mappedCarKids = car.kids.map((kid) => {
           if(kids && kids.find(k => k.id === kid.id)) {
           return <button className="btn btn-outline-primary btn-sm" key={kid.id} onClick={() => removeKidFromCar(kid, car.id)}>Remove {kid.name}</button> 
           } else {
            return null
           }
        })

  return (
    <div key={car.id} className="card" style={{ minWidth: 275 }}>
           <div className="card-body">
                <p>Driver: {car.user && car.user.name}</p>
                <p>School: {car.school}</p>
                <p>Seats: {car.seats_available}</p>
                <p>Time: {car.dismissal_time}</p>
                <p>Kids in Carpool: {car.kids && car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}</p>
            </div>
            <ul className="list-group list-group-flush">
                <p className="card-header">Days</p>
                    { car.monday === "monday" ? <li className="list-group-item">Monday</li> : null }
                    { car.tuesday === "tuesday" ? <li className="list-group-item">Tuesday</li> : null }
                    { car.wednesday === "wednesday" ? <li className="list-group-item">Wednesday</li> : null }
                    { car.thursday === "thursday" ? <li className="list-group-item">Thursday</li> : null }
                    { car.friday === "friday" ? <li className="list-group-item">Friday</li> : null }
            </ul>
            <div>
                <span>{mappedKids}</span>
                <span>{mappedCarKids}</span>
            </div> 
   </div>
  )
}

export default CarCard