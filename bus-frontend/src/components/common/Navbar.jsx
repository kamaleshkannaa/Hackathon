import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <span>🚌</span>
            <span>BusBook</span>
          </Link>
          
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/search" className="hover:text-blue-200">Search Buses</Link>
                <Link to="/my-bookings" className="hover:text-blue-200">My Bookings</Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Hi, {user?.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-primary px-4 py-1 rounded-lg text-sm font-medium hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="hover:text-blue-200">Login</Link>
                <Link to="/register" className="bg-white text-primary px-4 py-1 rounded-lg text-sm font-medium hover:bg-gray-100">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;