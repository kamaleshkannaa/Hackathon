import { createContext, useReducer, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  role: null, // 'USER' or 'ADMIN'
  error: null
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        role: action.payload.user.role,
        error: null
      };
    
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isAuthenticated: false
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        role: null,
        error: null
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          dispatch({ type: 'AUTH_SUCCESS', payload: { user } });
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: 'AUTH_FAILURE', payload: { error: 'Invalid session' } });
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: { error: null } });
      }
    };
    
    initAuth();
  }, []);

  // Login action
  const login = async (credentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: { user } });
      return { success: true, role: user.role };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: { error: errorMsg } });
      return { success: false, error: errorMsg };
    }
  };

  // Register action
  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: { error: errorMsg } });
      return { success: false, error: errorMsg };
    }
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!state.role) return false;
    if (requiredRole === 'ADMIN') return state.role === 'ADMIN';
    return true; // USER role can access USER routes
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    hasRole,
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
    updateUser: (data) => dispatch({ type: 'UPDATE_USER', payload: data })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
