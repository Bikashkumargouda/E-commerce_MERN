import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { addressFormControls } from '@/config'
import Form from '../common/Form'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/address-slice'
import AddressCard from './AddressCard'
import { useToast } from '@/hooks/use-toast'

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pinCode: "",
  notes: ""
}

const Address = ({ setCurrentSelectedAddress, selectedId }) => {


  const [formData, setFormData] = useState(initialAddressFormData)
  const [currentEditesId, setCurrentEditedId] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { addressList } = useSelector(state => state.shoppingAdddress)
  const { toast } = useToast()

  function handleManageAddress(event) {
    event.preventDefault()

    if (addressList.length >= 3 && currentEditesId === null) {
      setFormData(initialAddressFormData)
      toast({
        title: "Maximum address limit reached. You can only add 3 addresses.",
        variant: "destructive",
        type: "error"
      })
      return
    }

    currentEditesId !== null ?
      dispatch(
        editAddress({
          userId: user?.id, addressId: currentEditesId, formData
        })
      )
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id))
            setCurrentEditedId(null)
            setFormData(initialAddressFormData)
            toast({
              title: "Address updated successfully"
            })
          }
        }) : dispatch(addNewAddress({
          ...formData,
          userId: user?.id
        })).then(data => {
          console.log(data)
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id))
            setFormData(initialAddressFormData)
            toast({
              title: "Address added successfully"
            })
          }
        })
  }

  function handleDeleteAddress(getCurrentAddress) {
    console.log(getCurrentAddress);
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id))
        toast({
          title: "Address deleted successfully"
        })
      }
    })

  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id)
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pinCode: getCurrentAddress?.pinCode,
      notes: getCurrentAddress?.notes
    })
  }

  function isFormValid() {
    return Object.keys(formData).map((key) => formData[key].trim() !== "").every((item) => item)
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id))

  }, [dispatch])

  return (
    <Card>
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2'>
        {
          addressList && addressList?.length > 0 ?
            addressList.map((singleAddressItem, index) => (
              <div key={index} className='border p-3'>
                <AddressCard
                  selectedId={selectedId}
                  addressInfo={singleAddressItem}
                  handleDeleteAddress={handleDeleteAddress}
                  handleEditAddress={handleEditAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />

              </div>
            )) : null
        }
      </div>
      <CardHeader>
        <CardTitle>{currentEditesId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditesId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />

      </CardContent>
    </Card>
  )
}

export default Address