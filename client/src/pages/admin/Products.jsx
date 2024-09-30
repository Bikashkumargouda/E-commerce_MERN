// import ImageUpload from '@/components/admin/ImageUpload'
// import AdminProductTile from '@/components/admin/Product-Tile'
// import Form from '@/components/common/Form'
// import { Button } from '@/components/ui/button'
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
// import { addProductFormElements } from '@/config'
// import { useToast } from '@/hooks/use-toast'
// import { addNewProduct, editProducts, fetchAllProducts } from '@/store/admin/products-slice'
// import React, { Fragment, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const initialFormData = {
//   image: "null",
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: ""

// }

// const AdminProducts = () => {

//   const [openCreateProductDialog, setOpenProductDialog] = useState(false)

//   const [formData, setFormData] = useState(initialFormData)

//   const [imageFile, setImageFile] = useState(null)

//   const [uploadedImageUrl, setUploadedImageUrl] = useState("")

//   const [imageLoadingState, setImageLoadingState] = useState(false)

//   const [currentEditedId, setCurrentEditedId] = useState(null)

//   const { productList } = useSelector(state => state.adminProducts)

//   const dispatch = useDispatch()

//   const { toast } = useToast()




//   function onSubmit(event) {
//     event.preventDefault();
//     currentEditedId !== null ?
//       dispatch(editProducts({
//         id: currentEditedId,
//         formData
//       })).then((data) => {
//         console.log(data, "edit")
//         toast({
//           title: "Product updated successfully"
//         })
//         if (data?.payload?.success) {
//           dispatch(fetchAllProducts())
//           setFormData(initialFormData)
//           setOpenProductDialog(false)
//           setCurrentEditedId(null)

//         }
//       }) : dispatch(addNewProduct({
//         ...formData,
//         image: uploadedImageUrl,
//       })
//       ).then((data) => {
//         console.log(data)

//         if (data?.payload?.success) {
//           dispatch(fetchAllProducts())
//           setOpenProductDialog(false)
//           setImageFile(null)
//           setFormData(initialFormData)
//           toast({
//             title: "Product added successfully"
//           })
//         }
//       })
//   }




//   useEffect(() => {
//     dispatch(fetchAllProducts())
//   }, [dispatch])


//   // console.log(formData, "productList")

//   console.log(productList, uploadedImageUrl, " productList")

//   return (
//     <Fragment>
//       <div className='mb-5 flex justify-end'>
//         <Button onClick={() => setOpenProductDialog(true)}>
//           Add New Product
//         </Button>
//       </div>
//       <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
//         {
//           productList && productList.length > 0 ? productList.map((productItem, index) => {
//             return (
//               <div key={index}>
//                 <AdminProductTile setCurrentEditedId={setCurrentEditedId} setOpenProductDialog={setOpenProductDialog} setFormData={setFormData} product={productItem} />
//               </div>
//             )
//           }) : null
//         }
//       </div>
//       <Sheet open={openCreateProductDialog} onOpenChange={() => {
//         setOpenProductDialog(false)
//         setCurrentEditedId(null)
//         setFormData(initialFormData)
//       }}>
//         <SheetContent side="right" className="overflow-auto" >
//           <SheetHeader>
//             <SheetTitle>
//               <SheetDescription>
//                 {
//                   currentEditedId !== null ? "Edit Product" : "Add New Product"
//                 }
//               </SheetDescription>
//             </SheetTitle>
//           </SheetHeader>

//           <ImageUpload
//             imageFile={imageFile}
//             setImageFile={setImageFile}
//             uploadedImageUrl={uploadedImageUrl}
//             setUploadedImageUrl={setUploadedImageUrl}
//             setImageLoadingState={setImageLoadingState}
//             imageLoadingState={imageLoadingState}
//             // currentEditedId={currentEditedId}
//             isEditMode={currentEditedId !== null}

//           />



//           <div className='py-6'>
//             <Form
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               formControls={addProductFormElements}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   )
// }

// export default AdminProducts

// // ====================================================



import ImageUpload from '@/components/admin/ImageUpload';
import AdminProductTile from '@/components/admin/Product-Tile';
import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, deleteProducts, editProducts, fetchAllProducts } from '@/store/admin/products-slice';
import { data } from 'autoprefixer';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialFormData = {
  image: "null",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: ""
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector(state => state.adminProducts);

  const dispatch = useDispatch();
  const { toast } = useToast();



  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     if (currentEditedId !== null) {
  //       const result = await dispatch(editProducts({ id: currentEditedId, formData }));
  //       if (result?.payload?.success) {
  //         toast({ title: "Product updated successfully" });
  //         dispatch(fetchAllProducts());
  //         resetForm();
  //       }
  //     } else {
  //       const result = await dispatch(addNewProduct({ ...formData, image: uploadedImageUrl }));
  //       if (result?.payload?.success) {
  //         toast({ title: "Product added successfully" });
  //         dispatch(fetchAllProducts());
  //         resetForm();
  //       }
  //     }
  //   } catch (error) {
  //     toast({ title: "An error occurred", description: error.message });
  //   }
  // };

  const resetForm = () => {
    setOpenProductDialog(false);
    setImageFile(null);
    setFormData(initialFormData);
    setCurrentEditedId(null);
  };

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null ?
      dispatch(editProducts({
        id: currentEditedId,
        formData
      })).then((data) => {
        console.log(data, " edit")
        if (data?.payload?.success) {
          toast({
            title: "Product updated successfully"
          })
          dispatch(fetchAllProducts())
          resetForm()
        }
      }) :
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        console.log(data)
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          resetForm()
          toast({
            title: "Product added successfully"
          })
        }
      })
  }


  function handleDeleteProduct(getCurrentProductId) {
    dispatch(deleteProducts(getCurrentProductId)).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts())
        toast({
          title: "Product deleted successfully"
        })
        // alert("Delete Product successfully")
        console.log("Delete Product successfully")

      }
    })
  }

  function isFormVaild() {
    return Object.keys(formData).map(key => formData[key] !== "").every(item => item)
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(formData, "productList")

  return (
    <Fragment>
      <div className='mb-5 flex justify-end'>
        <Button onClick={() => setOpenProductDialog(true)}>Add New Product</Button>
      </div>


      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {productList?.length ? productList.map((productItem, index) => (
          <div key={index}>
            <AdminProductTile
              setCurrentEditedId={setCurrentEditedId}
              setOpenProductDialog={setOpenProductDialog}
              setFormData={setFormData}
              product={productItem}
              handleDelete={handleDeleteProduct}
            />
          </div>
        )) : <p>No products available.</p>}
      </div>



      <Sheet open={openCreateProductDialog} onOpenChange={resetForm}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <SheetDescription>
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </SheetDescription>
            </SheetTitle>
          </SheetHeader>

          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          // currentEditedId={currentEditedId}//extra
          />

          <div className='py-6'>
            <Form
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormVaild()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;


