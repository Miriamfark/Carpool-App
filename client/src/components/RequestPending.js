import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const RequestPending = () => {

    const id = useParams()

    const [carpool, setCarpool] = useState({})

    useEffect(() => {
        fetch(`/carpools/${id.id}`)
        .then((r) => r.json())
        .then((data) => {
            setCarpool(data)
            setStatusMessage(`${data.kid && data.kid.name} would like to join your carpool. Address: ${data.kid.address}`)

        })
    }, [id.id])

   const car = carpool.car
   const kid = carpool.kid

   const [statusMessage, setStatusMessage] = useState("")

   const days = {
    monday: car && car.monday,
    tuesday: car && car.tuesday,
    wednesday: car && car.wednesday,
    thursday: car && car.thursday,
    friday: car && car.friday
}

const mappedDays = Object.entries(days).map((day) => {
    if(day[0] === day[1]) {
        return <li className="list-group-item">
                    {day[0].charAt(0).toUpperCase() + day[0].slice(1)}
                </li>
    }
})

    function handleAcceptRequest() {
        const updatedCarpool = {
            status: "accepted"
        }
        fetch(`/carpools/${id.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCarpool)
        })
        .then((r) => {
            if(r.ok) {
                r.json().then(() => {
                    setStatusMessage(`${kid && kid.name} has joined your carpool! ${kid.address} has been added as an additional stop on your route.`)
                })
            } else {
                r.json().then((data) => console.log(data))
            }
        })
    }

    function handleRejectRequest() {
        console.log(id.id)
        fetch(`/carpools/${id.id}`, {
            method: "DELETE", 
        })
        .then((r) => {
            if(r.ok) {
                setStatusMessage(`You have rejected ${kid && kid.name}'s request!`)
            } 
        })
    }
    

  return (
    <div className="mt-4 ms-5 container bg-light text-center">
        <div className="card-body">
            <p>Driver: {car && car.user.name}</p>
            <p>School: {car && car.school}</p>
            <p>Time: {car && car.dismissal_time}</p>
        </div>
            <ul className="list-group list-group-flush">
                    <p className="card-header">Days:</p>
                    {mappedDays}
            </ul>
        
        <h3>{statusMessage}</h3>
        <button className="btn btn-primary" onClick={handleAcceptRequest}>Accept Request</button>
        <button className="btn btn-outline-primary" onClick={handleRejectRequest}>Reject Request</button>
    </div>
  )
}

export default RequestPending