import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {


  const location = useLocation()

  // console.log(location.pathname, isAuthenticated)


  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />
      } else {
        return <Navigate to="/shop/home" />
      }
    }
  }

  if (!isAuthenticated &&
    !(
      location.pathname.includes('/login') ||
      location.pathname.includes('/register'))) {
    return <Navigate to="/auth/login" />
  }

  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />
    } else {
      return <Navigate to="/shop/home" />
    }
  }

  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
    return <Navigate to="/unauthPage" />
  }
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
    return <Navigate to="/admin/dashboard" />
  }

  return (
    <div>{children}</div>
  )
}

export default CheckAuth

// ================================================================================================================

// import React from 'react'
// import { Navigate, useLocation } from 'react-router-dom'

// const CheckAuth = ({ isAuthenticated, user, children }) => {
//   const location = useLocation();

//   // If the user is not authenticated and not on login/register pages
//   if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
//     return <Navigate to="/auth/login" />;
//   }

//   // Wait until the user object is defined before handling redirection
//   if (isAuthenticated && user) {
//     if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
//       // If the user is admin, redirect to admin dashboard
//       if (user.role === "admin") {
//         return <Navigate to="/admin/dashboard" />;
//       } else {
//         return <Navigate to="/shop/home" />;
//       }
//     }

//     // Additional check to prevent non-admin users from accessing admin pages
//     if (user.role !== 'admin' && location.pathname.includes('admin')) {
//       return <Navigate to="/unauthPage" />;
//     }

//     // Prevent admin users from accessing shop routes
//     if (user.role === 'admin' && location.pathname.includes('shop')) {
//       return <Navigate to="/admin/dashboard" />;
//     }
//   }

//   // If everything is fine, render the children
//   return (
//     <div>{children}</div>
//   );
// }

// export default CheckAuth;
