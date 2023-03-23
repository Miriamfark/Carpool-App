import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import KidCardActions from './KidCardActions';


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
       {/* <KidCardActions kid={kid} onDelete={onDelete} /> */}
    </Card>
  )
}

export default KidCard