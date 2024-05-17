import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  //logged in as admin -> rander the .jsx element what is should be
  //not log in -> to /login
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  )
}

export default AdminRoute
