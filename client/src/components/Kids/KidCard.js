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
//     <MDBCard className='w-50' key={kid.id}>
//     <MDBCardBody>
//       <MDBCardTitle>{kid.name}</MDBCardTitle>
//       <MDBCardText>School: {kid.school}  Dismissal Time: {time}</MDBCardText>
//       <MDBBtn href='#' onClick={() => onDelete(kid.id)}>Remove</MDBBtn>
//       <Link to={`/kids/${kid.id}`}>Edit</Link>
//     </MDBCardBody>
//   </MDBCard>
  )
}

export default KidCard