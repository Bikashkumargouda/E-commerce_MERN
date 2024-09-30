import ImageUpload from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { addFeatureImage, getFeatureImages } from '@/store/common-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch()
  const { featureImageList } = useSelector(state => state.commonFeature)

  console.log(uploadedImageUrl, "uploadedImageUrl")

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages())
      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImages())
    // setImageFile(null)
    // setUploadedImageUrl("")
  }, [dispatch])

  console.log(featureImageList, "featureImageList")


  return (
    <div>
      {/* <h1>Upload Feature Images</h1> */}
      <ImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      // isEditMode={currentEditedId !== null}
      // currentEditedId={currentEditedId}//extra
      />

      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
      <div className='flex flex-col gap-4 mt-5'>
        {
          featureImageList && featureImageList.length > 0 ? featureImageList.map(featureImgItem => <div>
            <img className='w-full h-[200px] object-cover rounded-t-lg' src={featureImgItem.image} alt="" />
          </div>) : null
        }
      </div>
    </div>
  )
}

export default AdminDashboard