import { House, LogOut, Menu, ShoppingCart, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SheetTrigger, Sheet, SheetContent } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shopppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { Label } from '../ui/label'

function MenuiItems() {

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters")
    const currentFilter = getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products" && getCurrentMenuItem.id !== "search" ?
      {
        category: [getCurrentMenuItem.id]
      } : null
    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    location.pathname.includes("listing") && currentFilter !== null ?
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) : navigate(getCurrentMenuItem.path)
  }

  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row '>
    {
      shopppingViewHeaderMenuItems.map((menuItem) => {
        return (
          <div key={menuItem.id}>
            <Label onClick={() => handleNavigate(menuItem)} className='text-sm font-medium cursor-pointer'>{menuItem.label}</Label>
          </div>
        )
      })
    }

  </nav>
}


function HeaderRightContent() {
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shoppingCart)
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch])

  // console.log(cartItems, "Bikash")

  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" className="relative">

          <ShoppingCart className='w-8 h-8' />
          <span className='absolute top-[-5px] right-[2px] text-sm font-bold'>{cartItems.items?.length || 0}</span>
          <span className='sr-only'>User cart</span>
        </Button>
        <CartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User className='mr-2 h-4 w-4' />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' />
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

    </div>
  )
}

const ShoppingHeader = () => {

  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2'>
          <House className="h-6 w-6" />
          <span className='font-bold'>Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuiItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuiItems />
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>



      </div>

    </header>
  )
}

export default ShoppingHeader