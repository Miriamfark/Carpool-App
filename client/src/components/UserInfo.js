import React from 'react';
import { useSelector } from 'react-redux';

const UserInfo = () => {

    const kids = useSelector((state) => state.users.user.kids)
    const cars = useSelector((state) => state.users.user.cars)

    const userKids = kids.map((kid) => {
        return <li key={kid.id}>{kid.name}</li>
      })
    
      const userCars = cars.map((car) => {
        return <li key={car.id}>{car.dismissal_time}</li>
      })

  return (
    <div>
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