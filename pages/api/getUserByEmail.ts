import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByEmail } from '../../backend/user/service'

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
  if (req.method === 'GET') {
    try {
      const { email} = req.query
      console.log(req.query,"fdfs")
      const users:any = await getUserByEmail(email)
      res.status(200).json({ userbyemail: users})
      // users !== false ? res.status(200).json({ data: users, totalRecords: 4 }) : res.status(401).json({ message: 'Users not found' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }
}

export default handler
