import React from 'react'
import { CardContent, Typography } from '@mui/material';


const KidCardContent = ({ kid }) => {
  return (
    <div>
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
    </div>
  )
}

export default KidCardContent