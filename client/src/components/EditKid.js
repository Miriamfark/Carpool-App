import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateKid } from '../redux/usersSlice';

const EditKid = ({ kids }) => {

    const id = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const kid = kids.filter((kid) => kid.id == id.kidId)[0]

    const [name, setName] = useState(kid.name)
    const [school, setSchool] = useState(kid.school)
    const [dismissal, setDismissal] = useState(kid.dismissal_time)

    function handleUpdateKid(e) {
        e.preventDefault()
        const updatedKid = {
            id: id.kidId,
            name,
            school,
            dismissal_time: dismissal
        }
        dispatch(updateKid(updatedKid))
        navigate('/kids')
    }

  return (
    <div>
        <form onSubmit={handleUpdateKid}>
            <div>
                <label>Kid's Name:</label>
                <input
                type="text"
                defaultValue={kid.name}
                onChange={(e)=>setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>School:</label>
                <input
                type="text"
                defaultValue={kid.school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Dismissal:</label>
                <input
                type="time"
                defaultValue={kid.dismissal_time}
                onChange={(e)=> setDismissal(e.target.value)}
                ></input>
            </div>
            <input type="submit" value="Edit"></input>
        </form>
    </div>
  )
}

export default EditKid