import React from 'react'
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';

import { Link } from 'react-router-dom'

const KidCard = ({ kid, onDelete }) => {
  return (
    <Card sx={{ minWidth: 275 }} key={kid.id}>
        <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
            {kid.name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            School: {kid.school} 
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Dismissal Time: {kid.dismissal_time}
            </Typography>
        </CardContent>
        <CardActions>
            <Link to={`/kids/${kid.id}`} className="btn btn-primary">Edit</Link>
            <Button size="small" onClick={() => onDelete(kid.id)}>Remove</Button>
         </CardActions> 
    </Card>
  )
}

export default KidCard