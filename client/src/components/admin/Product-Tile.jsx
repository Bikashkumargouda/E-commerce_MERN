import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({ product, setCurrentEditedId, setOpenProductDialog, setFormData, handleDelete }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className='relative'>
          <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
        </div>
        <CardContent>
          <h3 className='text-xl font-medium tracking-tight mb-2 mt-2'>{product?.title}</h3>

          <div className=' flex justify-between items-center mb-2'>
            <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>

            {
              product?.salePrice > 0 ? <span className='text-lg font-bold'>${product?.salePrice}</span> : null
            }

          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={() => {
            setOpenProductDialog(true);
            setFormData(product);
            setCurrentEditedId(product?._id);

          }}>Edit</Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>

        </CardFooter>
      </div>
    </Card>
  )
}

export default AdminProductTile