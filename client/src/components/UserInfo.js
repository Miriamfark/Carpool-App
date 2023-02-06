import React from 'react';
import { useSelector } from 'react-redux';

const UserInfo = () => {

    const user = useSelector((state) => state.users.user)
    const kids = useSelector((state) => state.users.user.kids)
    const cars = useSelector((state) => state.users.user.cars)

    const userKids = kids.map((kid) => {

        return <p key={kid.id}>
            {kid.name}
            {/* <div>
                {kid.cars.map((car) => {
                    console.log(car)
                return <span key={car.id}>{}</span>
                })}
            </div> */}
            </p>
      })
    
      const userCars = cars.map((car) => {
        return <div key={car.id}>
            { car.monday ? (
                <>
                    <p>Monday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name}</span>)}
                </>
            ) : null }
            { car.tuesday ? (
                <>
                    <p>Tuesday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name}</span>)}
                </>
            ) : null }            
            { car.wednesday ? (
                <>
                    <p>Wednesday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name}</span>)}
                </>
            ) : null }            
            { car.thursday ? (
                <>
                    <p>Thursday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name}</span>)}
                </>
            ) : null }            
            { car.friday ? (
                <>
                    <p>Friday: {car.dismissal_time} </p>
                    {car.kids.map((kid) => <span key={kid.id}>{kid.name}</span>)}
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
        </div>
        <div>
            <h3>My Driving Duties:</h3>
            {userCars}
        </div>
    </div>
  )
}

export default UserInfo