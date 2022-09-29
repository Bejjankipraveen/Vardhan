import type { NextApiRequest, NextApiResponse } from 'next'
import { signUp } from '../../backend/auth/service'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { email, password,firstname,lastname, phonenumber} = JSON.parse(Object.keys(req.body)[0])
    try {
      const data = await signUp(email, password,firstname,lastname,phonenumber)
      data !== false ? res.status(200).json({ message: 'Account created successfully!' }) : res.status(401).json({ message: 'Error while creating new user account' })
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler
