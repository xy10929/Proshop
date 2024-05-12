import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  //logged in -> rander the .jsx element what is should be
  //not log in -> to /login
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
