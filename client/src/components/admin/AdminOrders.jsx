import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrederDetails from './AdminOrederDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/order-slice'
import { Badge } from '../ui/badge'

const AdminOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { orderList, orderDetails } = useSelector(state => state.adminOrder)
  const dispatch = useDispatch()


  function handleFetchhOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [orderDetails])

  // console.log(orderList, "orderList")
  // console.log(orderDetails, "orderDetails")

  return (
    <Card>
      <CardHeader>
        <CardTitle> All Orders </CardTitle>
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
                orderList.map((orderItem, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge className={`px-3 py-1 ${orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500" : orderItem?.orderStatus === "rejected" ? "bg-red-600" : orderItem?.orderStatus === "inShipping" ? "bg-gray-600" : orderItem?.orderStatus === "delivered" ? "bg-green-600" : "bg-black"}`}>
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
                          }}
                        >
                          <Button
                            onClick={() => handleFetchhOrderDetails(orderItem?._id)}
                          >View Details </Button>
                          <AdminOrederDetails orderDetails={orderDetails} />
                        </Dialog>

                      </TableCell>
                    </TableRow>
                  )
                }) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrders