import React from 'react'

const Errors = ({ errors }) => {
  return (
    <div>
        { errors ? <h5 class="text-danger">{errors}</h5> : null }
    </div>
  )
}

export default Errors