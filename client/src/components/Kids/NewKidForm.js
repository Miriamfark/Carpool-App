import React from 'react';
import { useDispatch } from 'react-redux';
import { postKid } from '../../redux/usersSlice';

const NewKidForm = ({
    school,
    setSchool,
    name,
    setName,
    dismissal,
    setDismissal
}) => {

    const dispatch = useDispatch()

    function handleNewKidSubmit(e) {
        console.log("in submit")
        e.preventDefault()
        const kid = {
            name,
            school,
            dismissal_time: dismissal
        }
        dispatch(postKid(kid))
        setName("")
        setSchool("")
        setDismissal("")
    }

  return (
    <div className="mt-5 mb-3 pe-5">
        <form onSubmit={handleNewKidSubmit}>
            <div>
                <label>Kid's Name:</label>
                <input
                                 className="form-control"

                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>School:</label>
                <input
                                 className="form-control"

                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Dismissal Time:</label>
                <input
                                 className="form-control"

                type="time"
                value={dismissal}
                onChange={(e)=> setDismissal(e.target.value)}
                ></input>
            </div>
            <input className="btn btn-primary mt-3" type="submit"></input>
        </form>
    </div>
  )
}

export default NewKidForm