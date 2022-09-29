import React, { SyntheticEvent, useState } from 'react'
import { Input, Box, Grid, Button } from '@mui/material'
import { FormBody } from '../../common/types'

export const Form = (props: any) => {
  const { handleSubmit, headerText } = props

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstname,setFirstname] = useState<string>('')
  const [lastname,setLastname] = useState<string>('')
  const [phonenumber,setPhonenumber] = useState<string>('')

  const inputFieldStyle = {
    display: 'block',
    width: '50%',
    margin: '30px auto'
  }

  // eslint-disable-next-line no-useless-escape, prefer-regex-literals
  const emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const PhonenumberPattern = new RegExp(/^\d{10}$/);
  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim()

    if (name === 'email') {
      if (!trimmedValue.length) {
        return 'Please enter your email'
      }
      if (!emailPattern.test(trimmedValue)) {
        return 'This isn’t an email'
      }
    }

    if (name === 'password') {
      if (!trimmedValue.length) {
        return 'Please enter your password'
      }
    }

    if (name === 'firstname') {
      if (!trimmedValue.length) {
        return 'Please enter firstname'
      }
    }
    if (name === 'lastname') {
      if (!trimmedValue.length) {
        return 'Please enter lastname'
      }
    }
    if (name === 'phonenumber') {
      if (!trimmedValue.length) {
        return 'Please enter phone number'
      }
      // if (!PhonenumberPattern.test(trimmedValue)) {
      //   return 'Please enter 10 digit Number'
      // }
    }

    return null
  }

  const validateForm = (email: string, password: string, firstname:string,lastname:string, phonenumber:string) => {
    const errors = {
      email: validateInput('email', email),
      password: validateInput('password', password),
      firstname: validateInput('firstname', firstname),
      lastname: validateInput('lastname', lastname),
      phonenumber:  validateInput('phonenumber', phonenumber)
    }
    const valid = Object.values(errors).filter(v => !!v).length === 0
    return { valid, errors }
  }

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const res = validateForm(email, password,firstname,lastname,phonenumber)
    if (!res.valid) {
      console.log('Not valid', res.valid)
    } else {
      const formBody: FormBody = {
        email,
        password,
        firstname,
        lastname,
        phonenumber,

      }
      handleSubmit(formBody)
    }
  }

  return <>
    <Grid container justifyContent="center" wrap="wrap" sx={{ backgroundColor: 'rgb(245, 248, 255)' }}>
        <Grid item xs={12} md={12} lg={12} xl={12} >
            <Box
                sx={{
                  width: 500,
                  height: 'auto',
                  backgroundColor: 'rgb(255, 255, 255)',
                  border: '2px solid rgb(171, 202, 255)',
                  textAlign: 'center',
                  borderRadius: '24px',
                  padding: '2rem 1.875rem 5rem 1.875rem',
                  margin: '0.625rem',
                  boxShadow: '0 10px 60px rgb(218, 229, 255)'
                }}
            > <h1 style={{ color: 'black' }}>{headerText}</h1>
                <form method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit} >
                <Input id='firstname' name='firstname' required={true} type="firstname" placeholder='Firstname' sx={inputFieldStyle} onChange={(e) => setFirstname(e.target.value)} />
                <Input id='lastname' name='lastname' required={true} type="lastname" placeholder='lastname' sx={inputFieldStyle} onChange={(e) => setLastname(e.target.value)} />
                <Input id='phonenumber' name='phonenumber' required={true} type="phonenumber" placeholder='phoneNumber' sx={inputFieldStyle} onChange={(e) => setPhonenumber(e.target.value)} />
                    <Input id='email' name='email' required={true} type="text" placeholder='Email' sx={inputFieldStyle} onChange={(e) => setEmail(e.target.value)} />
                    <Input id='password' name='password' required={true} type="password" placeholder='Password' sx={inputFieldStyle} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" size="medium" sx={{ display: 'block', margin: 'auto', color: 'black', border: '1px solid black' }}>Submit</Button>
                </form>
            </Box>
        </Grid>
    </Grid>
</>
}
