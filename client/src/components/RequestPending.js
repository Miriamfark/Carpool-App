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
            setStatusMessage(`${data.kid.name} would like to join your carpool.`)

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
                r.json().then((data) => {
                    setStatusMessage(`${kid && kid.name} has joined your carpool!`)
                })
            } else {
                r.json().then((data) => console.log(data))
            }
        })
    }

    function handleRejectRequest() {
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
    <div>
        <div>
            <p>Driver: {car && car.user.name}</p>
            <p>School: {car && car.school}</p>
            <p>Time: {car && car.dismissal_time}</p>
            <ul>
                <h5>Days</h5>
                { car && car.monday === "monday" ? <p>Monday</p> : null }
                { car && car.tuesday === "tuesday" ? <p>Tuesday</p> : null }
                { car && car.wednesday === "wednesday" ? <p>Wednesday</p> : null }
                { car && car.thursday === "thursday" ? <p>Thursday</p> : null }
                { car && car.friday === "friday" ? <p>Friday</p> : null }
            </ul>
        </div>
        <h3>{statusMessage}</h3>
        <button onClick={handleAcceptRequest}>Accept Request</button>
        <button onClick={handleRejectRequest}>Reject Request</button>
    </div>
  )
}

export default RequestPending