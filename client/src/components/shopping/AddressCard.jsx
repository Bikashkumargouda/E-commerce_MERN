import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId }) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress ? () =>
          setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${selectedId?._id === addressInfo?._id ? "border-red-900 border-[4px]" : "border-black"}`}
    >
      <CardContent className={` ${selectedId === addressInfo?._id ? "border-black" : ""} grid gap-4 p-2`}>
        <Label> <strong>Address :</strong>  {addressInfo?.address}</Label>
        <Label> <strong>City :</strong>  {addressInfo?.city}</Label>
        <Label> <strong>Pin Code :</strong>  {addressInfo?.pinCode}</Label>
        <Label> <strong>Phone :</strong>  {addressInfo?.phone}</Label>
        <Label> <strong>Notes :</strong>  {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard