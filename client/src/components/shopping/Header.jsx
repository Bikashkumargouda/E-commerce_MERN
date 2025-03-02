
import { House, LogOut, Menu, ShoppingCart, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SheetTrigger, Sheet, SheetContent } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shopppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser, resetTokenAndCredentials } from '@/store/auth-slice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { Label } from '../ui/label'
import logo from "..//..//..//public/EC-Logo.png"

function MenuItems() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters")
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null

    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
    } else {
      navigate(getCurrentMenuItem.path)
    }
  }

  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row '>
      {shopppingViewHeaderMenuItems.map((menuItem, index) => (
        <Label
          key={`${menuItem.id}-${index}`}
          onClick={() => handleNavigate(menuItem)}
          className='text-sm font-medium cursor-pointer'
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  )
}

function HeaderRightContent() {
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shoppingCart)
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logoutUser()).then(() => {
      dispatch(resetTokenAndCredentials())
      sessionStorage.clear()
      navigate("/auth/login")
    })
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user?.id))
    }
  }, [dispatch, user?.id])

  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
      <Sheet open={openCartSheet} onOpenChange={(open) => setOpenCartSheet(open)}>
        <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" className="relative">
          <ShoppingCart className='w-8 h-8' />
          <span className='absolute top-[-5px] right-[2px] text-sm font-bold'>
            {cartItems?.items?.length ?? 0}
          </span>
          <span className='sr-only'>User cart</span>
        </Button>
        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={window.innerWidth > 768 ? "right" : "bottom"} className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User className='mr-2 h-4 w-4' /> Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <header className=' w-full border-b bg-background h-[60px] md:h-[70px] shadow-md'>
      <div className='flex h-full items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center'>
          {/* <House className="h-6 w-6" /> */}
          <img src={logo} className=" w-40 rounded-full" alt="logo" />
          {/* <span className='font-bold text-xl'>Ecommerce</span> */}
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className='hidden lg:flex items-center gap-6'>
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader
