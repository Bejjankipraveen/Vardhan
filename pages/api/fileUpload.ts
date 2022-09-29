import nc from 'next-connect'
import multer from 'multer'
import { uploadFileToS3 } from '../../backend/utils/uploadFileToS3'
import { saveUploadedRecordDetails } from '../../backend/uploadedRecords/service'
import type { NextApiRequest, NextApiResponse } from 'next'

interface MulterRequest extends NextApiRequest {
  file: any;
}

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = nc({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({
  storage
})

const uploadFile = upload.single('file')

handler.use(uploadFile)
handler.post(async (req: MulterRequest, res: NextApiResponse) => {
  console.log('file uploaded', req.file)
  try {
    const uploadedImageToS3: any = await uploadFileToS3(req.file.path)
    const response = {
      uploadedImageUrl: uploadedImageToS3.Location
    }
    saveUploadedRecordDetails(req, res, uploadedImageToS3.Location)
    res.send(JSON.stringify(response))
  } catch (error) {
    console.log(error)
  }
})

export default handler
