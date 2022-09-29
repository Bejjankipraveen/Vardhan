import { query } from '../db/db'

// Get users by email query
export const getUserRecordByEmail = async (email: string) => {
  const text = `SELECT * FROM users WHERE email = '${email}'`
  try {
    const result: any = await query(text, [])
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

// SignUp db query
export const createUser = async (email: string, password: string, firstname:string,lastname:string,phonenumber:any) => {
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const text = `INSERT INTO users (email, password,first_name,last_name,phone_no,created_date_time, role_type) VALUES ('${email}', '${password}', '${firstname}','${lastname}', '${phonenumber}', '${currentDateTime}', '${'USER'}')`
  try {
    const result = await query(text, [])
    return result
  } catch (error) {
    console.log(error)
  }
}

// Get User with pagination query

export const getUsers = async (limit: any, skip: any, sortBy:any, sort:any) => {
  const sortValue = 'user_id'
  const sortType = (sort === 'descending' ? 'DESC' : 'ASC')
  // eslint-disable-next-line quotes
  // const text = `select * from users WHERE role_type IN ('USER') limit ${limit} OFFSET ${skip}`
  const text1 = `Select *, Count(*) Over () AS TotalCount From users Where role_type IN ('USER')  ORDER BY ${sortValue} ${sortType}  limit ${limit} OFFSET ${skip}`
  try {
    const result = await query(text1, [])
    return result
  } catch (error) {
    console.log(error)
  }
}
