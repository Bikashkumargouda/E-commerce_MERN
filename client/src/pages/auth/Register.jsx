import Form from '@/components/common/Form'
import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const initialstate = {
    userName: '',
    email: '',
    password: '',

  }

  const [formData, setFormData] = useState(initialstate)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()


  function onSubmit(e) {
    e.preventDefault()
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        })
        navigate("/auth/login")
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive"
        })

      }

    })
  }


  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-foreground tracking-tight font-bold text-3xl'>Craete new account</h1>
        <p className='mt-2'> Already have an account
          <Link to="/auth/login" className='font-medium ml-2 text-primary hover:underline'>Login</Link>
        </p>
      </div>

      <Form
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register