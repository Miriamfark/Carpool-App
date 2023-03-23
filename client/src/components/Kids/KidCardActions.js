import React from 'react'
import { CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom'


const KidCardActions = ({ kid, onDelete }) => {
  return (
    <div>
        <CardActions>
            <Link to={`/kids/${kid.id}`} className="btn btn-primary">Edit</Link>
            <Button size="small" onClick={() => onDelete(kid.id)}>Remove</Button>
         </CardActions> 
    </div>
  )
}

export default KidCardActions