import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import ShoopingProductTile from './Product-tile'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import ProductDetails from '@/components/shopping/ProductDetails'
import { fetchProductDetails } from '@/store/shop/product-slice'

const SearchProducts = () => {

  const [keyword, setKeyword] = useState("")
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchResults } = useSelector(state => state.shopSearch)
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.shoppingCart)
  const { user } = useSelector(state => state.auth)
  const { productDetails } = useSelector(state => state.shoppingProducts)
  const { toast } = useToast()

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(getSearchResults(keyword))
      }, 1000)
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
      dispatch(resetSearchResults())
    }
  }, [keyword])

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems)

    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId);
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Cannot add more items to the cart. Only ${getQuantity} items are available.`,
            variant: "destructive",
          })
          return;
        }
      }

    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1
      })
    ).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title: "Product is added to cart"
        })

      }
    })
  }
  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId)
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true)
    }
  }, [productDetails])



  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className='flex justify-center mb-8'>
        <div className='w-full flex items-center'>
          <Input value={keyword} name="keyword" onChange={(event) => setKeyword(event.target.value)} className="py-6" placeholder="Search Product..." />
        </div>
      </div>
      {
        !searchResults.length ? <h1 className='text-5xl font-extrabold text-center mt-28' > No result found</h1> : null
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
          searchResults.map((item, index) => {
            return (
              <ShoopingProductTile product={item} key={index} handleAddtoCart={handleAddtoCart} handleGetProductDetails={handleGetProductDetails} />
            )
          })
        }
      </div>
      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails} />
    </div>
  )
}

export default SearchProducts