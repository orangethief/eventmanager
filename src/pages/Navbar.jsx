import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const Navbar = () => {
  return (
    <div className="navbar-center">
      <ul className="menu menu-horizontal">
      <li><Link to="/" className="hover:text-blue-400 mr-4">Homepage</Link></li>
      <li><Link to="/events/:id" className="hover:text-blue-400 mr-4">Events</Link></li>
      {!isAuthenticated() ? (
        <>
          <li><Link to="/login/" className="hover:text-blue-400 mr-4">Log In</Link></li>
          <li><Link to="/signup/" className="hover:text-blue-400 mr-4">Sign Up</Link></li>
        </>
      ) : (
        <>
          <li><Link to="/logout" className='hover:text-blue-400 mr-4'>Logout</Link></li>
          <li><Link to="/new-event/" className="hover:text-blue-400 mr-4">Create Event</Link></li>
        </>
      )}
      </ul>
    </div>
  )
}

export default Navbar
