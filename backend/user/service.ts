import { getUserRecordByEmail, getUsers } from './db'
import { GetAllUsersApiResponse, User } from './user'

export const getUserByEmail = async (email: string) : Promise<User | false> => {
  const user = await getUserRecordByEmail(email)
  if (user) {
    return {
      userId: user?.user_id,
      email: user?.email,
      createdDateTime: user?.created_date_time,
      role: user?.role_type
    }
  }

  return false
}

// Get all users with pagination
export const getAllUsers = async (limit: any, skip: any, sortBy: any, sort: any) : Promise<GetAllUsersApiResponse | false> => {
  const users: any = await getUsers(limit, skip, sortBy, sort)
  if (users) {
    let finalResp:any = []
    users.forEach((x:any) => {
      const obj = {
        userId: x.user_id,
        email: x.email,
        createdDateTime: x.created_date_time,
        role: x.role_type
      }
      finalResp = [...finalResp, obj]
    })
    return { finalResp, totalRecords: users[0]?.TotalCount }
  }

  return false
}
