import axios from 'axios'
import { useCallback, useState } from 'react'
import { UserTableRow } from '../../backend/user/user'
import CustomTable from '../template/customTable'
import moment from 'moment'

const UserTableView = () => {
  const [reloadTableData] = useState(0)
  const [headCells, setHeadCells] = useState([
    {
      id: 'userId',
      label: 'User ID',
      search: ''
    }, {
      id: 'email',
      label: 'Email',
      search: ''
    }, {
      id: 'createdDateTime',
      label: 'Created At',
      search: ''
    }, {
      id: 'role',
      label: 'Role',
      search: ''
    }
  ])

  const fetchData = async (data:any) => {
    // eslint-disable-next-line quotes
    const page = data.page - 1
    const skipRecords = page * data.rowsPerPage
    // console.log('page', page, rowsPerPageNumber)
    console.log('dat.rowsper page', data.rowsPerPage, page)
    return await axios.get(`/api/getUsers?limit=${data.rowsPerPage}&skip=${skipRecords}&sortBy=${data.sort_column}&sort=${data.sort_type}`)
  }

  const formatRowData = useCallback(({ userId, email, createdDateTime, role }: UserTableRow) => {
    const dataTime = moment(createdDateTime).format('L')
    return { userId, email, createdDateTime: dataTime, role }
  }, [])

  return (
    <CustomTable
      headCells={headCells}
      triggerReloadRows={reloadTableData}
      api={fetchData}
      formatRowData={formatRowData}
      handleSearch={setHeadCells}
      defaultSortOrder={'asc'}
      defaultSortColumn={'userId'}
    />
  )
}

export default UserTableView
