
import { ChartNoAxesCombined } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, PartyPopper, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';


export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,

    // exact: true,
  },
  {
    id: "products",
    label: "products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
    // exact: true,
  },
  {
    id: "orders",
    label: "orders",
    path: "/admin/orders",
    icon: <PartyPopper />,
    // exact: true,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate()
  return (
    <nav className='mt-8 flex-col flex gap-2'>
      {
        adminSidebarMenuItems.map((menuItems) => {
          return (
            <div
              onClick={() => {
                navigate(menuItems.path);
                setOpen ? setOpen(false) : null
              }}
              key={menuItems.id} className='flex text-xl items-center gap-2 rounded-md px-3 py-4 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground'>
              {
                menuItems.icon
              }
              <span>{menuItems.label}</span>

            </div>
          )
        })
      }
    </nav>
  )
}


const Sidebar = ({ open, setOpen }) => {

  const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className='flex flex-col h-full'>
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
                <ChartNoAxesCombined size={30} />
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => navigate("/admin/dashboard")} className='flex items-center gap-2 cursor-pointer'>
          <ChartNoAxesCombined size={30} />
          <h1 className='text-2xl font-extrabold'>Admin Panel</h1>

        </div>
        <MenuItems />


      </aside>
    </Fragment>
  )
}

export default Sidebar