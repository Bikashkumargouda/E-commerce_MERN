import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/order-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaypalReturn = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const paymentId = params.get("paymentId")
  const payerId = params.get("PayerID")


  // paymentId=PAYID-M3ZFE2A70P555851V050293S&token=EC-5H50578909879812P&PayerID=V6HYRDAAZZLKJ

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))
      dispatch(capturePayment({
        orderId, payerId, paymentId
      })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId")
          window.location.href = "/shop/paymentsuccess"
        }
      })
    } else {
      console.error("Missing payment details in URL")
    }
  }, [paymentId, payerId, dispatch])


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Processing Payment...Please Wait!
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturn


