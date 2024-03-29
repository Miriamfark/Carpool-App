import React from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteCar } from '../../redux/carsSlice'
import { removeCar } from '../../redux/usersSlice'

const UserCarCard = ({ car }) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

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
                  <Link className="btn btn-primary" to={`${car.id}/route`}>See Route</Link>
                  <Link className="btn btn-primary" to={`${car.id}/edit`}>Edit</Link>
            <button 
              className="btn btn-outline-primary"
              onClick={() =>{
                navigate(`my_cars/${car.id}`)
                //here is a problem - when accessing the car card from UserInfo, the url messes up on delete
              dispatch(deleteCar(car.id))
              dispatch(removeCar(car.id))
              }}>Remove</button>
                </div>
            
            <Outlet />
            </div>
  )
}

export default UserCarCard