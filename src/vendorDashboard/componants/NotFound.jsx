import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div>
      <div className="error">
        <Link to="/" style={{fontSize:'1.5rem',color:'darkblue'}}>
        Go back
        </Link>
        <h4>404</h4>
        <div>Page not Found</div>
      </div>
    </div>
    </>
    
  )
}

export default NotFound
