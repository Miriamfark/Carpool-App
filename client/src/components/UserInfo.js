import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import KidCard from './Kids/KidCard';

const UserInfo = () => {

    const user = useSelector((state) => state.users.user)
    const kids = user.kids
    const cars = user.cars

    const navigate = useNavigate()

    const userKids = kids && kids.map((kid) => {
        return <KidCard kid={kid} />
      })
    
      const userCars = cars && cars.map((car) => {
        return <div className="card" key={car.id}>
            { car.monday === "monday" ? (
                <div>
                    <span>Monday: {car.dismissal_time} from {car.school} - </span>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </div>
            ) : null }
            { car.tuesday === "tuesday" ? (
                <div>
                    <span>Tuesday: {car.dismissal_time} from {car.school} - </span>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </div>
            ) : null }            
            { car.wednesday === "wednesday" ? (
                <div>
                    <span>Wednesday: {car.dismissal_time} from {car.school} - </span>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </div>
            ) : null }            
            { car.thursday === "thursday" ? (
                <div>
                    <span>Thursday: {car.dismissal_time} from {car.school} - </span>
                    {car.kids.map((kid) => <span key={kid.id}>with {kid.name} </span>)}
                </div>
            ) : null }            
            { car.friday === "friday" ? (
                <div>
                    <span>Friday: {car.dismissal_time} from {car.school} - </span>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </div>
            ) : null }            
            </div>
      })

  return (
    <div className="container text-center">
        <div className="p-3 mb-2 bg-info text-white">
            <h1 className="display-3">Welcome {user.name}!</h1>
        </div>
        <div className="container mb-2 bg-light">
            <h3>{user.name}'s Kids:</h3>
            {userKids}
            <div className="p-2 d-grid gap-2 col-3 mx-auto mb-5">
                <button className="btn btn-primary " onClick={()=>navigate('/kids')}>Add Kid</button>
            </div>
        </div>
        <div className="container bg-light">
            <h3>{user.name}'s Driving Duties:</h3>
            {userCars}
            <div className="p-2 d-grid gap-2 col-3 mx-auto mb-5">
                <button className="btn btn-primary " onClick={()=>navigate('/my_cars')}>Add Car</button>
            </div>
        </div>
        <Link className="btn btn-secondary" to="/cars">Look for more carpools here!</Link>
    </div>
  )
}

export default UserInfo