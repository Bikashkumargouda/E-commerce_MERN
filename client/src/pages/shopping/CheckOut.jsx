import React, { useState } from 'react'
import BanIng from "../../assets/account.jpg"
import Address from '@/components/shopping/Address'
import { useDispatch, useSelector } from 'react-redux'
import CartContent from '@/components/shopping/CartContent'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'

const ShoppingCheckOut = () => {

  const { cartItems } = useSelector(state => state.shoppingCart)
  const { user } = useSelector(state => state.auth)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymnetStart] = useState(false)
  const { approvalURL } = useSelector(state => state.shoppingOrder)
  const dispatch = useDispatch()
  const { toast } = useToast()


  console.log(currentSelectedAddress, "cartItems")

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((sum, currentItem) => sum + (
      currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0) : 0;

  function handleInitiatePaypalPayment() {

    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty, Please add item to proceed",
        variant: "destructive"
      })
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to processed",
        variant: "destructive"
      })
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pinCode: currentSelectedAddress?.pinCode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    }

    console.log('orderData: ', orderData);

    if (!orderData.userId || !orderData.cartItems.length || !orderData.addressInfo) {
      console.error('Missing required fields');
      return;
    }

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "Bikash")
      if (data?.payload?.success) {
        setIsPaymnetStart(true)
      } else {
        setIsPaymnetStart(false)
      }
    })
  }
  if (approvalURL) {
    window.location.href = approvalURL;
  }




  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={BanIng} className='h-full w-full object-cover object-center' alt="BannImg" />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.map((item, index) => {
              return (
                <div key={index}>
                  <CartContent cartItem={item} />
                </div>
              )
            }) : null
          }
          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
              <span className='font-bold'>Total</span>
              <span className='font-bold'>${totalCartAmount}</span>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {
                isPaymentStart ? "Processing Paypal Payment.... " : "Checkout with Paypal"
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckOut