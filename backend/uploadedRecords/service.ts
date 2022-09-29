import { updateUploadedRecords } from './db'
import type { NextApiRequest, NextApiResponse } from 'next'

export const saveUploadedRecordDetails = async (req: NextApiRequest, res: NextApiResponse, s3FileLocation: string) => {
  const response = await updateUploadedRecords(req, res, s3FileLocation)
  if (response) {
    console.log('file uploaded ====>', response)
    return true
  }
  return false
}
