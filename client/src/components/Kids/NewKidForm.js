import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postKid } from '../../redux/usersSlice';

const NewKidForm = ({
    school,
    setSchool,
    name,
    setName,
    dismissal,
    setDismissal
}) => {

    const dispatch = useDispatch()

    function handleNewKidSubmit(e) {
        e.preventDefault()
        const kid = {
            name,
            school,
            dismissal_time: dismissal
        }
        dispatch(postKid(kid))
        console.log(name, school, dismissal)
        setName("")
        setSchool("")
        setDismissal("")
    }

  return (
    <div>
        <form onSubmit={handleNewKidSubmit}>
            <div>
                <label>Kid's Name:</label>
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>School:</label>
                <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Dismissal:</label>
                <input
                type="time"
                value={dismissal}
                onChange={(e)=> setDismissal(e.target.value)}
                ></input>
            </div>
            <input type="submit"></input>
        </form>
    </div>
  )
}

export default NewKidForm