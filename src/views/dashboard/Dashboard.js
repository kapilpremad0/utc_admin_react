import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import axios from 'axios'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

// ✅ Replace with your actual base URL
import config from 'src/config'

const Dashboard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get(`${config.backendUrl}/api/admin/users`)
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setUsers(sortedUsers.slice(0, 5)) // only take 5 latest users
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Latest 5 Users</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Player ID</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Mobile</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Wallet Balance</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Is Guest</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={6} className="text-center">
                        No users found.
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    users.map((user, index) => (
                      <CTableRow key={user._id || index}>
                        <CTableDataCell className="text-center">
                          <CAvatar
                            size="md"
                            src={user.avatarUrl || avatar1}
                            status="success"
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{user.user_name}</div>
                          <div className="small text-body-secondary text-nowrap">
                            <span>{user.player_id}</span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>{user.player_id}</CTableDataCell>
                        <CTableDataCell>{user.mobile}</CTableDataCell>
                        <CTableDataCell>{user.wallet_balance}</CTableDataCell>
                        <CTableDataCell>{user.is_guest ? 'Yes' : 'No'}</CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
