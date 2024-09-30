import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShopppingOrderDetails from './ShopppingOrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderByUserId, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice'
import { Badge } from '../ui/badge'

const ShoppingOrders = () => {


  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { orderList, orderDetails } = useSelector(state => state.shoppingOrder)

  useEffect(() => {
    dispatch(getAllOrderByUserId({ userId: user?.id }))
  }, [dispatch])

  function handleFetchhOrderDetails(getId) {
    dispatch(getOrderDetails(getId))
  }


  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true)
    } else {
      setOpenDetailsDialog(false)
    }
  }, [orderDetails])

  console.log(orderDetails, "orderDetails")

  return (
    <Card>
      <CardHeader>
        <CardTitle> Order History </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Order Id </TableHead>
              <TableHead> Order Date </TableHead>
              <TableHead> Order Status </TableHead>
              <TableHead> Order Price </TableHead>
              <TableHead>
                <span className='sr-only' >Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ?
                orderList.map(orderItem => <TableRow>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge className={`px-3 py-1 ${orderItem?.orderStatus === "confirmed" ? "bg-green-500" : orderItem?.orderStatus === "rejected" ? "bg-red-600" : orderItem?.orderStatus === "delivered" ? "bg-green-500" : orderItem?.orderStatus === "inShipping" ? "bg-gray-600" : "bg-black"}`}>
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false)
                        dispatch(resetOrderDetails())
                      }}>
                      <Button onClick={() => handleFetchhOrderDetails(orderItem?._id)}>View Details </Button>
                      <ShopppingOrderDetails orderDetails={orderDetails} />
                    </Dialog>

                  </TableCell>
                </TableRow>) : null
            }

          </TableBody>
        </Table>
      </CardContent>
    </Card >
  )
}

export default ShoppingOrders