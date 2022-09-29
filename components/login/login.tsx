import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import Router from 'next/router'
import { FormLogin } from '../loginForm/index'
import { FormBodyLogin } from '../../common/types'
import { useCookies } from 'react-cookie'

export const Login = () => {
  const [loginStatus, setLoginStatus] = useState<string>('')
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['tok'])

  useEffect(() => {
    // Need to write logic for auto login
  }, [])

  const handleSubmit = async (formBody:FormBodyLogin) => {
    try {
      console.log('handle submit running =====>', formBody)
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(formBody)
      })
      const body = await resp.json()
      if (resp.status === 200) {
        // const authTokenCookieOptions = { httpOnly: true, secure: true, sameSite: 'Strict' }
        setCookie('tok', body.jwtToken, { path: '/' })
        if (body.user.role === 'ADMIN') {
          Router.push('/dashboard')
        } else {
          Router.push('/uploadFile')
        }
      } else {
        console.log(body.response)
        setLoginStatus('User not found')
      }
    } catch (e) {
      console.log('Hey there was an error =>>>>', e)
    }
  }

  return <>
       <FormLogin
       handleSubmit = {handleSubmit}
       isSignup={false}
       headerText={'Login'}
        />

    {
        loginStatus.length > 0
          ? <Alert severity="error" sx={{
            position: 'absolute',
            right: '10px',
            bottom: '20px'
          }}>{loginStatus}</Alert>
          : null
    }
    </>
}
