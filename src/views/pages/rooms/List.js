import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import config from '../../../config';
import {
  CCard, CCardBody, CTable, CTableHead, CTableHeaderCell,
  CTableRow, CTableBody, CTableDataCell,
  CFormInput, CPagination, CPaginationItem,
  CAvatar,
  CButton,
} from '@coreui/react';
import { Link } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/admin/rooms`);
      setRooms(response.data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to fetch rooms');
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const valuesToSearch = [
      room.boot_amount,
      room.max_blind,
      room.max_chaal,
      room.status,
      room.total_pot,
      ...room.players.map(p => p.user_name),
      ...room.players.map(p => p.player_id),
      room.winner?.user_name,
      room.winner?.player_id,
    ];

    return valuesToSearch.some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage);

  const renderAvatar = (avatar) => {
    const fileName = avatar ? `avatar${avatar}.png` : 'default.png';
    return `${config.backendUrl}/assets/${fileName}`;
  };

  return (
    <div>
      <ToastContainer />
      <CCard>
        <CCardBody>
          <div className="d-flex justify-content-between mb-3">
            <h5>Rooms</h5>
          </div>

          <div className="mb-3">
            <CFormInput
              type="text"
              placeholder="Search by any field"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <CTable striped hover responsive bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                {/* <CTableHeaderCell>Room ID</CTableHeaderCell> */}
                <CTableHeaderCell>Boot</CTableHeaderCell>
                <CTableHeaderCell>Pot</CTableHeaderCell>
                <CTableHeaderCell>Players</CTableHeaderCell>
                <CTableHeaderCell>Winner</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedRooms.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="7" className="text-center">
                    No rooms found.
                  </CTableDataCell>
                </CTableRow>
              ) : (
                paginatedRooms.map((room, index) => (
                  <CTableRow key={room._id}>
                    <CTableDataCell className="text-center">
                      {startIndex + index + 1}
                    </CTableDataCell>

                    {/* <CTableDataCell>
                      ₹{room.total_pot}
                    </CTableDataCell> */}

                    <CTableDataCell>
                      ₹{room.boot_amount} <br />
                      <small>Blind: ₹{room.max_blind}</small><br />
                      <small>Chaal: ₹{room.max_chaal}</small>
                    </CTableDataCell>

                    <CTableDataCell>
                      ₹{room.total_pot}
                    </CTableDataCell>

                    <CTableDataCell>
                      {room.players.map((p) => (
                        <div key={p._id} className="d-flex align-items-center gap-2 mb-1">
                          <CAvatar size="sm" src={renderAvatar(p.avatar)} />
                          <div>
                            <div>{p.user_name}</div>
                            <small>{p.player_id}</small>
                          </div>
                        </div>
                      ))}
                    </CTableDataCell>

                    <CTableDataCell>
                      {room.winner ? (
                        <div className="d-flex align-items-center gap-2">
                          <CAvatar size="sm" src={renderAvatar(room.winner.avatar)} />
                          <div>
                            <div>{room.winner.user_name}</div>
                            <small>{room.winner.player_id}</small>
                          </div>
                        </div>
                      ) : '—'}
                    </CTableDataCell>

                    <CTableDataCell>{room.status}</CTableDataCell>

                    <CTableDataCell>
                      {new Date(room.createdAt).toLocaleString()}
                    </CTableDataCell>

                    <CTableDataCell>
                      <Link to={`/rooms/show/${room._id}`}>
                        <CButton color="warning" size="sm" className="me-2">View</CButton>
                      </Link>
                    </CTableDataCell>


                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <CPagination align="center">
                {[...Array(totalPages)].map((_, i) => (
                  <CPaginationItem
                    key={i + 1}
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{ cursor: 'pointer' }}
                  >
                    {i + 1}
                  </CPaginationItem>
                ))}
              </CPagination>
            </div>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default RoomList;
