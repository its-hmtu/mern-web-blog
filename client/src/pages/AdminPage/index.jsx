import React from 'react'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'
import { useEffect } from 'react'
import { useLogoutUser } from 'hooks/user'
import { useQueryClient } from 'react-query'

const AdminPage = () => {
  const {user, setUser} = useContext(AuthContext)
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      if (user.role !== 'admin' && user.role !== 'moderator' && user.role !== 'editor') {
        return <Navigate to='/' replace/>
      }
    }
  }, [user])

  return (
    <Navigate to='login' replace/>
  )
}

export default AdminPage