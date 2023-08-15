import React from 'react'
import { useUser } from '../../hooks/queries/useUser'
import './Profile.css'

const Profile = () => {
  const { data, isLoading, isError, error} = useUser()
  
  console.log(data)

  return (
    <div >
      
      <div className='user-picture'>
      <i className='bx bxs-user'></i>
      </div>
      <div className='user-info'>
        <h1>Test User</h1>
        <h2>test123@gmail.com</h2>
        <p>Thanks for using my App!</p>
      </div>
     
      
      
      
    </div>
  )
}

export default Profile
