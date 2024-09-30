import React, { useEffect, useState } from 'react'
import banner1 from "../../../src/assets/banner-1.webp"
import banner2 from "../../../src/assets/banner-2.webp"
import banner3 from "../../../src/assets/banner-3.webp"
import { Button } from '@/components/ui/button'
import { BabyIcon, BellElectricIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ShoopingProductTile from './Product-tile'
import Nike from "../../../src/assets/Nike.png";
import Puma from "../../../src/assets/Puma.png";
import Adidas from "../../../src/assets/Adidas.png";
import HM from "../../../src/assets/H&M.png";
import Levis from "../../../src/assets/Levis.png";
import Zara from "../../../src/assets/zara.png";
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import ProductDetails from '@/components/shopping/ProductDetails'
import { getFeatureImages } from '@/store/common-slice'


const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "Footwear", label: " Footwear", icon: UmbrellaIcon },
  { id: "electronics", label: "Electronics", icon: BellElectricIcon },
]

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: Nike },
  { id: "adidas", label: "Adidas", icon: Adidas },
  { id: "puma", label: "Puma", icon: Puma },
  { id: "levi", label: "Levvi's", icon: Levis },
  { id: "zara", label: "Zara", icon: Zara },
  { id: "h&m", label: "H&M", icon: HM },
]

const ShoppingHome = () => {

  const slides = [banner1, banner2, banner3]

  const [currentSlide, setCurrentSlide] = useState(0)
  const { productList, productDetails } = useSelector(state => state.shoppingProducts)
  // const { featureImageList } = useSelector(state => state.commonFeature)
  const { user } = useSelector(state => state.auth)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  function handleNavigateToListingpage(getCurrentItem, section) {
    sessionStorage.removeItem("filters")
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddtoCart(getCurrentProductId) {
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

  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true)
    }
  }, [productDetails])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 4000);

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }))
  }, [dispatch])

  // console.log(productList, "productList")


  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])


  return (
    <div className='flex  flex-col min-h-screen'>

      {/*============ Banner ======= */}
      <div className='relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px]  overflow-hidden'>
        {
          slides.map((slide, index) => {
            return (
              <div key={index}>
                <img className={`${index == currentSlide ? "opacity-100" : "opacity-0"} object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-1000`} src={slide} alt='banner' />
              </div>
            )
          })
        }
        <Button
          onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)}
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <Button
          onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)}
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>

      {/* =========== Category ======== */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              categoriesWithIcon.map((categoryItem, index) => {
                return (
                  <div key={index}>
                    <Card onClick={() => handleNavigateToListingpage(categoryItem, "category")} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                        <span className='font-bold'>{categoryItem.label}</span>
                      </CardContent>

                    </Card>
                  </div>
                )
              })
            }

          </div>
        </div>

      </section>

      {/* =========== Brand ======== */}

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brands</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brandWithIcon.map((brandItem, index) => {
                return (
                  <div key={index}>
                    <Card onClick={() => handleNavigateToListingpage(brandItem, "brand")} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <img src={brandItem.icon} alt={brandItem.label} className='w-12 h-12 mb-4 text-primary' />
                        <span className='font-bold'>{brandItem.label}</span>
                      </CardContent>

                    </Card>
                  </div>
                )
              })
            }

          </div>
        </div>

      </section>

      {/* ==========Products============== */}
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0 ?
                productList.slice(0, 4).map((productItem, index) => {
                  return (
                    <ShoopingProductTile key={index} handleGetProductDetails={handleGetProductDetails} product={productItem} handleAddtoCart={handleAddtoCart} />
                  )
                })
                : null
            }


          </div>
        </div>

      </section>

      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails} />
    </div>
  )
}

export default ShoppingHome