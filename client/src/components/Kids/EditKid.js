import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateKid } from '../../redux/usersSlice';

const EditKid = ({ kids }) => {

    const id = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const kid = kids && kids.filter((kid) => kid.id == id.kidId)[0]

    const [name, setName] = useState(kid && kid.name)
    const [school, setSchool] = useState(kid && kid.school)
    const [dismissal, setDismissal] = useState(kid && kid.dismissal_time)

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
     <div className="mt-5 mb-3 pe-5">
         <form onSubmit={handleUpdateKid}>
             <div>
                 <label>Kid's Name:</label>
                 <input
                 className="form-control"
                 type="text"
                 defaultValue={kid && kid.name}
                 onChange={(e)=>setName(e.target.value)}
                 ></input>
             </div>
             <div>
                 <label>School:</label>
                 <input
                 className="form-control"
                 type="text"
                 defaultValue={kid && kid.school}
                 onChange={(e) => setSchool(e.target.value)}
                 ></input>
             </div>
             <div>
                 <label>Dismissal:</label>
                 <input
                 className="form-control"
                 type="time"
                 defaultValue={kid && kid.dismissal_time}
                 onChange={(e)=> setDismissal(e.target.value)}
                 ></input>
             </div>
             <input  className="btn btn-primary mt-3" type="submit" value="Save Changes"></input>
         </form>
     </div>
  )
}

export default EditKid