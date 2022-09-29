/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Box, Grid, Button, TextField, Alert } from '@mui/material'
import jwt from 'jwt-decode'
import { useCookies } from 'react-cookie'

export const UploadFileComponent = () => {
  const [imagePath, setImagePath] = useState<string>('')
  const [userComment, setUserComment] = useState<string>('')
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(['tok'])

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()
      const jwtToken: any = jwt(cookie.tok)
      if (jwtToken.userId) {
        const form = new FormData(e.target)
        form.append('userComment', userComment)
        form.append('userId', jwtToken.userId.toString())
        const resp = await fetch('/api/fileUpload', {
          method: 'POST',
          body: form
        })
        const body = await resp.json()
        setImagePath(body.uploadedImageUrl)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (<>
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
                > <h1 style={{ color: 'black' }}>Upload your files to S3</h1>
                    <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit} >
                        {/* <Input id='file-input' name="file" type="file" sx={{
                          display: 'none'
                        }} />
                        <InputLabel htmlFor="file-input" sx={{
                          margin: '20px 0'

                        }}>Select file</InputLabel> */}
                        <input type="file" name="file" id="file-input" />
                        <img src={imagePath} style={{ width: '100px', height: '100px', display: imagePath ? 'block' : 'none', margin: 'auto' }} alt="iamge" />
                        <TextField id="comments" type="text" placeholder='Comments' sx={{
                          margin: '20px 0'
                        }} onChange={(e) => setUserComment(e.target.value)} />
                        <Button type="submit" size="medium" sx={{ display: 'block', margin: 'auto', color: 'black' }} >Submit</Button>
                    </form>
                    {
                        imagePath
                          ? <Alert severity="success" sx={{
                            position: 'absolute',
                            right: '10px',
                            bottom: '20px'
                          }}>Image Uploaded Successfully. URL: {imagePath}</Alert>
                          : null
                    }
                </Box>
            </Grid>
        </Grid>
    </>
  )
}
