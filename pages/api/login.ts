import type { NextApiRequest, NextApiResponse } from 'next'
import { login } from '../../backend/auth/service'

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = JSON.parse(Object.keys(req.body)[0])
      const user = await login(email, password)
      user !== false ? res.status(200).json({ jwtToken: user.jwtToken, user: user.user }) : res.status(401).json({ message: 'User not found' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }
}

export default handler
