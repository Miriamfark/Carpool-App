import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeKid } from '../../redux/usersSlice';
import NewKidForm from './NewKidForm';
import KidCard from './KidCard';
import { Grid, Box } from '@mui/material';

const KidsList = () => {

    const kids = useSelector((state) => state.users.user.kids)
  
    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState("")
    const [school, setSchool] = useState("")
    const [dismissal, setDismissal] = useState("")

    function handleDeleteKid(id) {
        dispatch(removeKid(id))
    }

    function toggleKidForm() {
        setShowForm(!showForm)
    }


    const mappedKids = kids && kids.map((kid) => {

        const time = kid && kid.dismissal_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
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
    <div className="ms-5 me-5 mt-3 text-center">
        <h6>My Kids:</h6>
        <Box className="ps-5 pt-3 pb-3 mb-3 mt-5 ms-5 me-5 border border-3">
            <Grid 
                container 
                direction="row"
                alignItems="stretch"
                >
                    {mappedKids}
                </Grid>
            <Outlet />
        </Box>
            
    
        <button type="button" className="btn btn-secondary" onClick={toggleKidForm}>Add Kid</button>
        { showForm ? <NewKidForm 
        name={name}
        setName={setName}
        school={school}
        setSchool={setSchool}
        dismissal={dismissal}
        setDismissal={setDismissal}
        setShowForm={setShowForm}
        /> : null }
    </div>
  )
}

export default KidsList