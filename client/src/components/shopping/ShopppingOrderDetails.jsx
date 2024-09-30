import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const ShopppingOrderDetails = ({ orderDetails }) => {


  const { user } = useSelector(state => state.auth)
  console.log(orderDetails, "orderDetails")
  console.log(orderDetails?.addressInfo?.address)

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className='grid gap-6'>
        <div className='grid gap-2'>
          <div className='flex mt-6 items-center justify-between'>
            <p className='font-medium '> Order Id</p>
            <Label> {orderDetails?._id}</Label>
          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium '> Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium '> Order Price</p>
            <Label>$ {orderDetails?.totalAmount}</Label>
          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium '> Payment Metod</p>
            <Label> {orderDetails?.paymentMethod}</Label>
          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium '> Payment Status</p>
            <Label> {orderDetails?.paymentStatus}</Label>
          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium '> Order Status</p>
            <Label>

              <Badge
                className={
                  `px-3 py-1 ${orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500" : orderDetails?.orderStatus === "rejected" ? "bg-red-600" : orderDetails?.orderStatus === "inShipping" ? "bg-gray-600" : orderDetails?.orderStatus === "delivered" ? "bg-green-500" : "bg-black"


                  }`


                }>




                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />

        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div className='font-medium'>Order Details</div>
            <ul className='grid gap-3'>

              {
                orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? orderDetails.cartItems.map(item => <li className='flex items-center justify-between'>
                  <span>Title : {item.title}</span>
                  <span>Quantity : {item.quantity}</span>
                  <span>Price : ${item.price}</span>
                </li>) : null
              }
            </ul>
          </div>
        </div>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div className='font-medium'>Shipping Info</div>
            <div className='grid gap-0.5 text-muted-foreground'>
              <span>{user.userName}</span>
              {/* ==================================11:36=============================== */}
              <span>{orderDetails?.addressInfo?.address || 'Address not available'}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pinCode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>

    </DialogContent>
  )
}

export default ShopppingOrderDetails