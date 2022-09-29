import React, { SyntheticEvent, useState } from 'react'
import { Input, Box, Grid, Button } from '@mui/material'

interface DataType {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

function ChangePasswordComponent () {
  const [data, setData] = useState<DataType>({ currentPassword: '', newPassword: '', confirmNewPassword: '' })

  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim()
    switch (name) {
      case 'currentPassword':
        if (!trimmedValue.length) return 'Please enter your current password'
        break
      case 'newPassword':
        if (!trimmedValue.length) return 'Please enter your new password'
        break
      case 'confirmNewPassword':
        if (!trimmedValue.length) return 'Please confirm your new password'
        break
    }
    return null
  }

  const validateForm = () => {
    const errors = {
      currentPassword: validateInput('currentPassword', data.currentPassword),
      newPassword: validateInput('newPassword', data.newPassword),
      confirmNewPassword: validateInput('confirmNewPassword', data.confirmNewPassword)
    }
    const valid = Object.values(errors).filter(v => !!v).length === 0
    return { valid, errors }
  }

  const handleSubmit = (formBody: any) => {
    // Over here we have to handle the form submit
    console.log('Form Data', formBody)
  }

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const res = validateForm()
    if (!res.valid) {
      console.log('Not valid', res.valid)
    } else {
      const formBody: any = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword
      }
      handleSubmit(formBody)
    }
  }

  const handleValueChange = (name: string, value: string) => {
    // eslint-disable-next-line prefer-const
    let newData:any = data
    newData[name] = value
    setData(newData)
  }

  const inputFieldStyle = {
    display: 'block',
    width: '50%',
    margin: '30px auto'
  }

  return (
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
            > <h1 style={{ color: 'black' }}>Change Password</h1>
                <form method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit} >
                    <Input id='currentPassword' name='currentPassword' required={true} type="text" placeholder='Current Password' sx={inputFieldStyle} onChange={(e) => handleValueChange('currentPassword', e.target.value)} />
                    <Input id='newPassword' name='newPassword' required={true} type="newPassword" placeholder='New Password' sx={inputFieldStyle} onChange={(e) => handleValueChange('newPassword', e.target.value)} />
                    <Input id='confirmNewPassword' name='confirmNewPassword' required={true} type="confirmNewPassword" placeholder='Confirm New Password' sx={inputFieldStyle} onChange={(e) => handleValueChange('confirmNewPassword', e.target.value)} />
                    <Button type="submit" size="medium" sx={{ display: 'block', margin: 'auto', color: 'black', border: '1px solid black' }}>Submit</Button>
                </form>
            </Box>
        </Grid>
    </Grid>
  )
}

export default ChangePasswordComponent
