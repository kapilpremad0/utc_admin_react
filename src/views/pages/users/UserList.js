import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CFormInput,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.player_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile?.includes(searchTerm)
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <CCard>

        <CCardBody>

          <div className="d-flex justify-content-between mb-3">
            <h5>User List</h5>
          </div>

          <div className="mb-3">
            <CFormInput
              type="text"
              placeholder="Search by boot, blind or chaal"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to page 1 on search
              }}
            />
          </div>


          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>

                {/* <CTableHeaderCell className="bg-body-tertiary text-center">Sr No.</CTableHeaderCell> */}
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Player ID</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Mobile</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Is Guest</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedUsers.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center">
                    No users found.
                  </CTableDataCell>
                </CTableRow>
              ) : (
                paginatedUsers.map((user, index) => (
                  <CTableRow key={user._id || index}>
                    {/* <CTableDataCell className="text-center">
                      {startIndex + index + 1}
                    </CTableDataCell> */}
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={user.avatar || avatar1} status={'success'} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{user.user_name}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{user.player_id}</span>
                      </div>
                    </CTableDataCell>
                    {/* <CTableDataCell>{user.user_name}</CTableDataCell> */}
                    <CTableDataCell>{user.player_id}</CTableDataCell>
                    <CTableDataCell>{user.mobile}</CTableDataCell>
                    <CTableDataCell>{user.is_guest ? 'Yes' : 'No'}</CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-3 d-flex justify-content-center">
              <CPagination>
                {[...Array(totalPages)].map((_, index) => (
                  <CPaginationItem
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </CPaginationItem>
                ))}
              </CPagination>
            </div>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default UserList
