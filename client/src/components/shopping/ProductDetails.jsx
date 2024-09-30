import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarHalf, StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import { setProductDetails } from '@/store/shop/product-slice'
import { Label } from '../ui/label'
import StarRating from '../common/StarRating'
import { addReview, getReviews } from '@/store/shop/review-slice'

const ProductDetails = ({ open, setOpen, productDetails }) => {


  const [reviewMsg, setReviewMsg] = useState("")
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { toast } = useToast()
  const { cartItems } = useSelector(state => state.shoppingCart)
  const { reviews } = useSelector(state => state.shopReview)

  function handleAddToCart(getCurrentProductId, getTotalStock) {

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

  function handleDialogClose() {
    setOpen(false)
    dispatch(setProductDetails())
    setRating(0)
    setReviewMsg("")
  }

  function handleRatingChange(getRating) {
    setRating(getRating)
  }
  function handleAddReview() {
    dispatch(addReview({
      userId: user?.id,
      productId: productDetails?._id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      } else {
        console.error("Failed to add review:", data);
        toast({
          title: "Failed to add review",
          variant: "destructive",
        });
      }
    }).catch((error) => {
      console.error("Error adding review:", error);
      toast({
        title: "An error occurred",
        variant: "destructive",
      });
    });


  }

  useEffect(() => {
    if (productDetails !== null) {
      console.log("Fetching reviews for product ID:", productDetails?._id);
      dispatch(getReviews(productDetails?._id))
    }
  }, [productDetails])


  // console.log(reviews, "reviews")


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className='relative overflow-hidden rounded-lg'>

          <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-square w-full object-cover' />
        </div>
        <div className=''>
          <div>
            <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
            <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className={`text-3xl font-bold text-primary ${productDetails?.price > 0 ? "line-through" : " "}`}>
              ${productDetails?.price}
            </p>

            {
              productDetails?.salePrice > 0 &&
              <div className='text-xl font-bold text-muted-foreground'>
                Sale price: ${productDetails?.salePrice}
              </div>
            }
          </div>


          <div className='flex items-center gap-2 mt-2'>
            <div className='flex items-center gap-0.5'>
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarHalf className='w-5 h-5 fill-primary' />


            </div>
            <span className='text-muted-foreground'>(4.5)</span>

          </div>


          <div className='mt-5 mb-5'>

            {
              productDetails?.totalStock === 0 ? <Button className='w-full opacity-60 cursor-not-allowed'>Out of Stock</Button> : <Button className='w-full' onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}>Add to Cart</Button>
            }


          </div>
          <Separator />
          <div className='max-h-[300px] overflow-auto'>
            <h2 className='text-xl font-bold mb-4'>Reviews</h2>
            <div className='grid gap-6'>
              <div className='flex gap-4'>
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>
                    BK
                  </AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-bold'>Bikash Kumar Gouda</h3>

                  </div>
                  <div className='flex items-center gap-0.5
                  '>
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarHalf className='w-5 h-5 fill-primary' />
                  </div>
                  <p className='text-muted-foreground'>This is an awesome product</p>

                </div>

              </div>
            </div>
            <div className='mt-10 flex flex-col gap-2'>
              <Label>Write a review</Label>
              <div className='flex gap-1'>
                <StarRating rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input name="reviewMsg" value={reviewMsg} onChange={(event) => setReviewMsg(event.target.value)} placeholder="Write a review..." />
              <Button
                disabled={reviewMsg.trim() === ""}
                onClick={handleAddReview}
              >Submit</Button>
            </div>

          </div>
        </div>


      </DialogContent>

    </Dialog>
  )
}

export default ProductDetails



