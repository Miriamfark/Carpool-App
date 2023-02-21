import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {

    const user = useSelector((state) => state.users.user)
    const kids = useSelector((state) => state.users.user.kids)
    const cars = useSelector((state) => state.users.user.cars)

    const navigate = useNavigate()

    const userKids = kids && kids.map((kid) => {

        return <p key={kid.id}>
            {kid.name}
            </p>
      })
    
      const userCars = cars && cars.map((car) => {
        return <div key={car.id}>
            { car.monday === "monday" ? (
                <>
                    <p>Monday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </>
            ) : null }
            { car.tuesday === "tuesday" ? (
                <>
                    <p>Tuesday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </>
            ) : null }            
            { car.wednesday === "wednesday" ? (
                <>
                    <p>Wednesday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </>
            ) : null }            
            { car.thursday === "thursday" ? (
                <>
                    <p>Thursday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </>
            ) : null }            
            { car.friday === "friday" ? (
                <>
                    <p>Friday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name} </span>)}
                </>
            ) : null }            
            </div>
      })

  return (
    <div>
        <div>
            <h1>Welcome {user.name}!</h1>
        </div>
        <div>
            <h3>My Kids:</h3>
            {userKids}
            <button onClick={()=>navigate('/kids')}>Add Kid</button>
        </div>
        <div>
            <h3>My Driving Duties:</h3>
            {userCars}
            <button onClick={()=>navigate('/my_cars')}>Add a Car</button>
        </div>
    </div>
  )
}

export default UserInfo