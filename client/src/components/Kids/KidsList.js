import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeKid, updateKid } from '../../redux/usersSlice';
import NewKidForm from './NewKidForm';

const KidsList = () => {

    const kids = useSelector((state) => state.users.user.kids)
    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)
    // const [editForm, setEditForm] = useState(false)
    const [name, setName] = useState("")
    const [school, setSchool] = useState("")
    const [dismissal, setDismissal] = useState("")

    function handleDeleteKid(id) {
        //cleanup the form
        // setEditForm(!editForm)
        dispatch(removeKid(id))
        //navigate to /kids
    }

    function handleUpdateKid(kid) {
        dispatch(updateKid(kid))
    }

    function toggleKidForm() {
        setShowForm(!showForm)
    }


    const mappedKids = kids && kids.map((kid) => {

        const time = kid.dismissal_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        return <li key={kid.id}>
            Name: {kid.name}   School: {kid.school}  Dismissal Time: {time}
            <Link to={`${kid.id}`}>Edit</Link>
            <button onClick={() => handleDeleteKid(kid.id)}>Remove</button>
            </li>
    })

  return (
    <div>
        My Kids:
        <ul>
            {mappedKids}
            <Outlet />
        </ul>
        <button onClick={toggleKidForm}>Add Kid</button>
        { showForm ? <NewKidForm 
        name={name}
        setName={setName}
        school={school}
        setSchool={setSchool}
        dismissal={dismissal}
        setDismissal={setDismissal}
        /> : null }
    </div>
  )
}

export default KidsList