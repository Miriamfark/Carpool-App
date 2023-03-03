import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeKid, updateKid } from '../../redux/usersSlice';
import NewKidForm from './NewKidForm';
import KidCard from './KidCard';
import { Grid, Box, Button } from '@mui/material';

const KidsList = () => {

    const kids = useSelector((state) => state.users.user.kids)
    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState("")
    const [school, setSchool] = useState("")
    const [dismissal, setDismissal] = useState("")

    function handleDeleteKid(id) {
        console.log("in delete")
        dispatch(removeKid(id))
    }

    function toggleKidForm() {
        setShowForm(!showForm)
    }


    const mappedKids = kids && kids.map((kid) => {

        const time = kid.dismissal_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        return(
            <Grid key={kid.id} item style={{display: 'flex'}}> 
                <KidCard 
                    key={kid.id}
                    kid={kid}
                    onDelete={handleDeleteKid}
                />
            </Grid> 
        )
    })

  return (
    <div className="ms-5 me-5 mt-5">
        <h6>My Kids:</h6>
        <Box className="ps-5 pt-5 pb-5 mb-5 mt-5 ms-5 me-5 border border-3">
            <Grid 
                container 
                // spacing={8}
                direction="row"
                // justifyContent="space-evenly"
                alignItems="stretch"
                >
                    {mappedKids}
                </Grid>
        </Box>
            <Outlet />
    
        <button type="button" className="btn btn-secondary" onClick={toggleKidForm}>Add Kid</button>

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