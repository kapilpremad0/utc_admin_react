import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import config from '../../../config'
import { ToastContainer } from 'react-toastify'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CBadge,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const RoomDetail = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${config.backendUrl}/api/admin/room_detail/${id}`)
        setRoom(res.data)
      } catch (err) {
        console.error('Error fetching room:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!room) return <p>Room not found</p>

  return (
    <div>
      <ToastContainer />
      <CCard className="mb-4 shadow">
        <CCardHeader>
          <h4>Room Detail (ID: {room._id})</h4>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-4">
            <CCol md={4}>
              <strong>Boot Amount:</strong> <CBadge color="primary">₹{room.boot_amount}</CBadge>
            </CCol>
            <CCol md={4}>
              <strong>Max Blind:</strong> <CBadge color="warning">₹{room.max_blind}</CBadge>
            </CCol>
            <CCol md={4}>
              <strong>Max Chaal:</strong> <CBadge color="info">₹{room.max_chaal}</CBadge>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol md={4}>
              <strong>Total Pot:</strong> <CBadge color="success">₹{room.total_pot}</CBadge>
            </CCol>
            <CCol md={4}>
              <strong>Status:</strong>{' '}
              <CBadge color={room.status === 'completed' ? 'success' : 'secondary'}>
                {room.status}
              </CBadge>
            </CCol>
          </CRow>

          <hr />

          <h5>Players</h5>
          <ul>
            {room.players.map((player) => (
              <li key={player._id}>
                <strong>{player.user_name}</strong> (ID: {player.player_id}) {' '}
                {/* <span className="text-muted">Avatar: {player.avatar}</span> */}
              </li>
            ))}
          </ul>

          <hr />

          <h5>Winner</h5>
          {room.winner ? (
            <CBadge color="success" className="p-2">
              {room.winner.user_name} (ID: {room.winner.player_id})
            </CBadge>
          ) : (
            <CBadge color="danger">No winner yet</CBadge>
          )}

          <hr />

          <h5 className="mb-3">Bets</h5>
          <CTable bordered striped responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell>Amount</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Blind?</CTableHeaderCell>
                <CTableHeaderCell>Time</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {room.bets.map((bet) => (
                <CTableRow key={bet._id}>
                  <CTableDataCell>{bet.user_id.user_name}</CTableDataCell>
                  <CTableDataCell>₹{bet.amount}</CTableDataCell>
                  <CTableDataCell>{bet.type}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={bet.is_blind ? 'primary' : 'secondary'}>
                      {bet.is_blind ? 'Yes' : 'No'}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{new Date(bet.created_at).toLocaleTimeString()}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default RoomDetail
