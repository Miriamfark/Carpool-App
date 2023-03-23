import React from 'react'
import { Card, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import KidCardContent from './KidCardContent';

const KidCard = ({ kid, onDelete }) => {
  return (
    <Card sx={{ minWidth: 275 }} key={kid.id}>
       <KidCardContent kid={kid} />
        <CardActions>
            <Link to={`/kids/${kid.id}`} className="btn btn-primary">Edit</Link>
            <Button size="small" onClick={() => onDelete(kid.id)}>Remove</Button>
         </CardActions>     </Card>
  )
}

export default KidCard