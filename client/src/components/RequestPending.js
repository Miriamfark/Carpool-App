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
            setStatusMessage(`${data.kid && data.kid.name} would like to join your carpool.`)

        })
    }, [id.id])

   const car = carpool.car
   const kid = carpool.kid

   const [statusMessage, setStatusMessage] = useState("")


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
                    setStatusMessage(`${kid && kid.name} has joined your carpool!`)
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
                    { car && car.monday === "monday" ? <li className="list-group-item">Monday</li> : null }
                    { car && car.tuesday === "tuesday" ? <li className="list-group-item">Tuesday</li> : null }
                    { car && car.wednesday === "wednesday" ? <li className="list-group-item">Wednesday</li> : null }
                    { car && car.thursday === "thursday" ? <li className="list-group-item">Thursday</li> : null }
                    { car && car.friday === "friday" ? <li className="list-group-item">Friday</li> : null }
            </ul>
        
        <h3>{statusMessage}</h3>
        <button className="btn btn-primary" onClick={handleAcceptRequest}>Accept Request</button>
        <button className="btn btn-outline-primary" onClick={handleRejectRequest}>Reject Request</button>
    </div>
  )
}

export default RequestPending