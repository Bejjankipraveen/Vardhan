import React, { useState } from 'react'
import { Alert, AlertColor } from '@mui/material'
import { Form } from '../form/form'
import { FormBody } from '../../common/types'
import { useCookies } from 'react-cookie'
import useUser from '../application/hooks/useUser'

interface SignUpStatus {
  message: string
  severity: AlertColor
}

export const SignUp = () => {
  const [signUpStatus, setSignUpStatus] = useState<SignUpStatus | undefined>(undefined)
  const user = useUser()
  console.log('user from signup', user)

  const handleSubmit = async (formBody:FormBody) => {
    console.log(formBody)
    console.log(JSON.stringify(formBody))
    const resp = await fetch('/api/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(formBody)
    })
    const body = await resp.json()
    if (resp.status === 200) {
      setSignUpStatus({ message: 'User Added', severity: 'success' })
    } else {
      console.log(body.message)
      console.log(body.response)
      setSignUpStatus({ message: body.message, severity: 'error' })
    }
  }

  return <>
      <Form
       handleSubmit = {handleSubmit}
       headerText={'Create a new user account'}
       />

      {
        signUpStatus?.message && <Alert severity={signUpStatus.severity} sx={{
          position: 'absolute',
          right: '10px',
          bottom: '20px'
        }}>{signUpStatus.message}</Alert>
      }
    </>
}
