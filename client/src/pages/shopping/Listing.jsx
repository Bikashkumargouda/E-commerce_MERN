import ProductFilter from '@/components/shopping/Filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
// import { fetchAllProducts } from '@/store/admin/products-slice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShoopingProductTile from './Product-tile'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductDetails from '@/components/shopping/ProductDetails'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'


const ShoppingListing = () => {

  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector(state => state.shoppingProducts)
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shoppingCart)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const categorySearchParams = searchParams.get("category")
  const navigate = useNavigate()

  function handleSort(value) {
    setSort(value)
  }
  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption)

    let copyFilters = { ...filters }
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId)

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption)
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption)
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1)
        if (copyFilters[getSectionId].length === 0) {
          delete copyFilters[getSectionId]
        }
      }
    }
    setFilters(copyFilters)
    sessionStorage.setItem('filters', JSON.stringify(copyFilters))
    // console.log(copyFilters);
  }
  function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',');
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join('&');
  }

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId)
    dispatch(fetchProductDetails(getCurrentProductId))
  }


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

  useEffect(() => {
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, [categorySearchParams])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  // Fetch List of Products
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }))
  }, [dispatch, sort, filters])


  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true)
    }
  }, [productDetails])

  // console.log(productList, "xxxxxxxx")


  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold '>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex ic gap-1">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map((sortItem) => {
                      return (
                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      )
                    })
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4'>
          {
            productList && productList.length > 0 ? productList.map((productItem, index) => <ShoopingProductTile key={index} product={productItem} handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart} />) : null
          }




        </div>

      </div>
      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails} />
    </div>
  )
}

export default ShoppingListing