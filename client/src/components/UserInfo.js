import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import KidCardContent from './Kids/KidCardContent';
import { Button, CardContent, Typography } from '@mui/material';
import Route from './Route';


const UserInfo = () => {

    const user = useSelector((state) => state.users.user)
    const kids = user.kids
    const cars = user.cars

    const navigate = useNavigate()

    function showRoute(car) {
        navigate(`${car.id}/route`)
    }

    const userKids = kids && kids.map((kid) => {
        return <KidCardContent key={kid.id} kid={kid} />
      })
    
  
      const userCars = cars && cars.map((car) => {

          const days = {
            monday: car.monday,
            tuesday: car.tuesday,
            wednesday: car.wednesday,
            thursday: car.thursday,
            friday: car.friday
        }

        const mappedDays = Object.entries(days).map((day, index) => {
            if(day[0] === day[1]) {
                return (
                    <CardContent key={index}>
                        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                        {`${day[0].charAt(0).toUpperCase() + day[0].slice(1)}: `}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {`${car.dismissal_time} from ${car.school} -`}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {car.kids.map((kid) => <span key={kid.id}>{kid.name}, </span>)}                        
                        </Typography>
                        <Button onClick={()=> showRoute(car)}>See Route</Button>
                    </CardContent> 
                )
            }
        })
        return mappedDays
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