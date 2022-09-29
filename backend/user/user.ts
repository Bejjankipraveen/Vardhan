export interface User {
  userId: Number,
  email: string,
  createdDateTime: string,
  role: string
}

export interface UserTableRow {
  userId: Number,
  email: string,
  createdDateTime: string,
  role: string
}

export interface GetAllUsersApiResponse {
  finalResp: User,
  totalRecords: number
}
