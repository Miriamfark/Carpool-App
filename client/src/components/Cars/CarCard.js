import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchCars } from '../../redux/carsSlice';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';


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
        return  <Button key={kid.id} onClick={() => addKidToCar(kid, car.id)}>Add {kid.name}</Button>   
       })
       
       const time = car.dismissal_time && car.dismissal_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

       const mappedCarKids = car.kids.map((kid) => {
           if(kids && kids.find(k => k.id === kid.id)) {
           return <Button key={kid.id} onClick={() => removeKidFromCar(kid, car.id)}>Remove {kid.name}</Button> 
           }
        })

  return (
    <Card sx={{ minWidth: 275 }} key={car.id}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Driver: {car.user && car.user.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Seats Available: {car.seats_available}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        School: {car.school}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Time: {car.dismissal_time}
                        </Typography>
                        <Typography variant="body2">
                        Kids in Carpool: {car.kids && car.kids.map((kid, index) => <span key={index}>{kid.name} </span>)}
                        </Typography>
                        <Typography variant="body2">
                        <h5>Days:</h5>
                            { car.monday === "monday" ? <span>Monday</span> : null }
                            { car.tuesday === "tuesday" ? <span>Tuesday</span> : null }
                            { car.wednesday === "wednesday" ? <span>Wednesday</span> : null }
                            { car.thursday === "thursday" ? <span>Thursday</span> : null }
                            { car.friday === "friday" ? <span>Friday</span> : null }              </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">{mappedKids}</Button>
                        <Button size="small">{mappedCarKids}</Button>
                    </CardActions> 
                </Card>
  )
}

export default CarCard