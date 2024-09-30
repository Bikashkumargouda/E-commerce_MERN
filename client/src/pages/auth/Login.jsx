import Form from '@/components/common/Form'
import { loginFormControls } from '@/config'
import { toast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Login = () => {

  const initialstate = {

    email: '',
    password: '',

  }

  const [formData, setFormData] = useState(initialstate)
  const dispatch = useDispatch()


  function onSubmit(e) {
    e.preventDefault()
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        })
      }
      else {
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
        <h1 className='text-foreground tracking-tight font-bold text-3xl'>Sign in to your account</h1>
        <p className='mt-2'> Don't have an account
          <Link to="/auth/register" className='font-medium ml-2 text-primary hover:underline'>Register</Link>
        </p>
      </div>

      <Form
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Login