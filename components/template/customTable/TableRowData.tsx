/* eslint-disable @next/next/no-img-element */

import { TableRow } from '@mui/material'
import { map } from 'lodash'
import { TableRowDataProps } from '../../../backend/customTable/customTable'
import { getComparator, stableSort } from './helper'
import { BodyCell } from './style'

const TableRowData = ({ headCells, rows, order, orderBy }: TableRowDataProps) => {
  return (
    <>
      {map(stableSort(rows, getComparator(order, orderBy)), (row, index) => {
        return (
          <TableRow
              hover
              tabIndex={-1}
              key={`${Object.keys(row)[0]}-${index}`}
          >
            {
              map(headCells, function (cell:any) {
                return <BodyCell key={cell.id} style={{ fontSize: '17px' }}>{row[cell.id]}</BodyCell>
              })
            }
          </TableRow>
        )
      })
      }

    </>
  )
}

export default TableRowData
