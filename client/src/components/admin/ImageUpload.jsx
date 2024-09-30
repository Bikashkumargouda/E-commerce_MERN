import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

const ImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {

  const inputRef = useRef(null)

  function handleImageFileChange(e) {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setImageFile(selectedFile)
    }
  }
  function handleDragOver(e) {
    e.preventDefault()
    // e.stopPropagation()
    // e.target.classList.add('border-2-dashed-blue')

  }
  function handleDrop(event) {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) setImageFile(droppedFile)
  }


  function handleRemoveImg() {
    setImageFile(null)
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // console.log(formData, "formData")


  async function uploadImageToCloudinary() {
    setImageLoadingState(true)
    const data = new FormData()
    data.append('image', imageFile)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/uploadimg`, data)
    console.log(response, 'response')
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url)
      setImageLoadingState(false)
    }

  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary()
  }, [imageFile])

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}  `}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div className={` ${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}>
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          className={` hidden`}
          disabled={isEditMode}

        />

        {
          !imageFile ? (<Label htmlFor="image-upload" className={`${isEditMode ? 'cursor-not-allowed' : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}>
            <UploadCloudIcon className={`${isEditMode ? 'cursor-not-allowed' : ""} w-10 h-10 text-muted-foreground mb-2`} />
            <span className={`${isEditMode ? 'cursor-not-allowed' : ""}`} >Drag & drop or click to upload image</span>
          </Label>
          )
            : imageLoadingState ? (<Skeleton className='h-10 bg-gray-100' />) : (
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FileIcon className='w-8 h-8 text-primary mr-2' />
                </div>
                <p className='text-sm font-medium'>
                  {
                    imageFile.name
                  }
                </p>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImg}>
                  <XIcon className='w-4 h-4' />
                  <span className='sr-only' >Remove File</span>
                </Button>
              </div>)
        }

      </div>
    </div >
  )
}

export default ImageUpload

