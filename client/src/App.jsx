import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './components/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminOrders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import AuthLayout from './components/auth/Layout'
import ShoppingLayout from './components/shopping/Layout'
import NotFound from './pages/not-Found/NotFound'
import ShoppingHome from './pages/shopping/Home'
import ShoppingListing from './pages/shopping/Listing'
import ShoppingCheckOut from './pages/shopping/CheckOut'
import ShoppingAccount from './pages/shopping/Account'
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './pages/unauthPage/UnauthPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturn from './pages/shopping/PaypalReturn'
import PaypalCancel from './pages/shopping/PaypalCancel'
import PaymentSuccess from './pages/shopping/PaymentSuccess'
import SearchProducts from './pages/shopping/SearchProducts'


const App = () => {


  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    dispatch(checkAuth(token))
    // console.log("its working")
  }, [dispatch])
  if (isLoading)
    return <Skeleton className="w-[800px] bg-black h-[600px] " />

  // console.log(isLoading, user)

  return (
    <div className='flex flex-col overflow-hidden bg-white'>


      <Routes>

        <Route path='/' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout />
          </CheckAuth>
        } />

        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

        </Route>


        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='checkout' element={<ShoppingCheckOut />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='paypalreturn' element={<PaypalReturn />} />
          <Route path='paypalcancel' element={<PaypalCancel />} />
          <Route path='paymentsuccess' element={<PaymentSuccess />} />
          <Route path='search' element={<SearchProducts />} />

        </Route>

        <Route path='*' element={<NotFound />} />

        <Route path='/unauthPage' element={<UnauthPage />} />

      </Routes>

    </div>
  )
}

export default App