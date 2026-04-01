import { useAuth } from './useAuth';

export const useRoleCheck = () => {
  const { role, hasRole, isAuthenticated } = useAuth();

  const checkRole = (requiredRole) => {
    if (!isAuthenticated) return false;
    return hasRole(requiredRole);
  };

  const isAdmin = () => checkRole('ADMIN');
  const isUser = () => checkRole('USER');

  const canAccess = (allowedRoles) => {
    if (!isAuthenticated) return false;
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return allowedRoles.includes(role);
  };

  return {
    role,
    isAdmin,
    isUser,
    canAccess,
    checkRole,
    isAuthenticated
  };
};

export default useRoleCheck;
