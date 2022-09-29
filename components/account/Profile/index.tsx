/* eslint-disable @next/next/no-img-element */
import React, { SyntheticEvent, useState, useEffect } from 'react'
import { Input, Box, Grid, Button } from '@mui/material'
import axios from 'axios'

interface ProfileDataType {
  imagePath: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNo: string
}

function ProfileComponent(user: any) {

  useEffect(() => {
    fetchdataUser()
  }, [])
  const [emailUser, setEmailuser] = useState<string>('')
  const [firstname,setFirstname] = useState<string>('')
  const [lastname,setLastname] = useState<string>('')
  const [phonenumber,setPhonenumber] = useState<string>('')
  const [data, setData] = useState<ProfileDataType>({ imagePath: '', firstName: '', lastName: '', email: '', phoneNo: '' })
  
  async function fetchdataUser() {
    console.log("userss", user) 
    let { email } = user.user





    let response = await axios.get(`/api/getuserByemail?email=${email}`)


   

    let {firstName, lastName, contactNo } = response?.data?.userbyemail

    setEmailuser(response?.data?.userbyemail?.email)
    setFirstname(firstName)
    setLastname(lastName)
    setPhonenumber(contactNo)
    // setData(fetchdata)
  }




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
      imagePath: validateInput('imagePath', data.imagePath),
      firstName: validateInput('firstName', data.firstName),
      lastName: validateInput('currentPassword', data.lastName),
      email: validateInput('currentPassword', data.email),
      phoneNo: validateInput('currentPassword', data.phoneNo)
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
        imagePath: data.imagePath,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNo: data.phoneNo
      }
      handleSubmit(formBody)
    }
  }

  const handleValueChange = (name: string, value: string) => {
    // eslint-disable-next-line prefer-const
    let newData: any = data
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
        > <h1 style={{ color: 'black' }}>Profile</h1>
          <form method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit} >
            <input type="file" name="file" id="file-input" />
            {data.imagePath && <img src={data.imagePath} style={{ width: '100px', height: '100px', margin: 'auto' }} alt="iamge" />}
            <Input id='firstName' name='firstName' required={true} value={firstname} type="text" placeholder='First Name' sx={inputFieldStyle} onChange={(e) => handleValueChange('firstName', e.target.value)} defaultValue={data.firstName} />
            <Input id='lastName' name='lastName' required={true} value ={lastname}type="text" placeholder='Last Name' sx={inputFieldStyle} onChange={(e) => handleValueChange('lastName', e.target.value)} />
            <Input id='email' name='email'value={emailUser} required={true} type="text" placeholder='Email' sx={inputFieldStyle} onChange={(e) => handleValueChange('email', e.target.value)} />
            <Input id='contactNo' name='contactNo' value= {phonenumber}required={true} type="text" placeholder='Contact Number' sx={inputFieldStyle} onChange={(e) => handleValueChange('phoneNo', e.target.value)} />
            <Button type="submit" size="medium" sx={{ display: 'block', margin: 'auto', color: 'black' }} >Submit</Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  )

}

export default ProfileComponent
