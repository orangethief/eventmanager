import { Navigate } from 'react-router-dom'
import { logout } from '../utils/auth'

export const LogOutPage = () => {
  logout();

  return <Navigate to="/" />
}
