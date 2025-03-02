
import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from '../shopping/Header'

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white min-h-screen'>
      {/* Fixed Header */}
      <header className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        <ShoppingHeader />
      </header>

      {/* Main Content with padding to avoid overlap */}
      <main className='flex flex-col w-full pt-[60px]'>
        <Outlet />
      </main>
    </div>
  )
}

export default ShoppingLayout
