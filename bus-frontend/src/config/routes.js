export const ROUTE_PERMISSIONS = {
  // Public routes
  public: ['/', '/login', '/register', '/search', '/bus/:id'],
  
  // User-only routes
  user: [
    '/seat-selection',
    '/booking',
    '/booking-confirmation',
    '/my-bookings',
    '/profile'
  ],
  
  // Admin-only routes
  admin: [
    '/admin',
    '/admin/dashboard',
    '/admin/buses',
    '/admin/routes',
    '/admin/schedules',
    '/admin/bookings',
    '/admin/profile'
  ]
};

export const ROLE_HIERARCHY = {
  ADMIN: ['ADMIN', 'USER'],
  USER: ['USER']
};

export const checkRouteAccess = (path, userRole) => {
  if (!userRole) return false;
  
  // Check exact match
  if (ROUTE_PERMISSIONS[userRole.toLowerCase()]?.includes(path)) {
    return true;
  }
  
  // Check pattern match for dynamic routes
  const roleRoutes = ROUTE_PERMISSIONS[userRole.toLowerCase()] || [];
  return roleRoutes.some(route => {
    if (route.includes(':')) {
      const pattern = route.replace(/:\w+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(path);
    }
    return route === path;
  });
};

export const getDefaultRoute = (role) => {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'USER':
      return '/';
    default:
      return '/login';
  }
};
