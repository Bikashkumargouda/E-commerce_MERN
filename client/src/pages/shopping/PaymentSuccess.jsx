import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {

  const navigate = useNavigate()

  return (
    <Card className="flex flex-col items-center justify-center  p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">
          Payment is successfull
        </CardTitle>
      </CardHeader>
      <Button className="mt-10" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  )
}

export default PaymentSuccess