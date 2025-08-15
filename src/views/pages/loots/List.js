import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard, CCardBody, CTable, CTableHead, CTableHeaderCell,
  CTableRow, CTableBody, CTableDataCell, CAvatar, CFormInput, CPagination, CPaginationItem
} from '@coreui/react';
import config from '../../../config';
import { ToastContainer, toast } from 'react-toastify';

const LootsHistory = () => {
  const [loots, setLoots] = useState([]);
  const [filteredLoots, setFilteredLoots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const lootsPerPage = 10;

  useEffect(() => {
    fetchLoots();
  }, []);

  useEffect(() => {
    filterLoots();
  }, [searchTerm, loots]);

  const fetchLoots = async () => {
    try {
      const res = await axios.get(`${config.backendUrl}/api/admin/loots`);
      setLoots(res.data);
    } catch (error) {
      console.error('Error fetching loots:', error);
      toast.error('Failed to fetch loots');
    }
  };

  const filterLoots = () => {
    const filtered = loots.filter(loot =>
      loot?.user_id?.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loot?.user_id?.player_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLoots(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const renderAvatar = (avatar) => {
    const fileName = avatar ? `avatar${avatar}.png` : 'default.png';
    return `${config.backendUrl}/assets/${fileName}`;
  };

  const indexOfLastLoot = currentPage * lootsPerPage;
  const indexOfFirstLoot = indexOfLastLoot - lootsPerPage;
  const currentLoots = filteredLoots.slice(indexOfFirstLoot, indexOfLastLoot);
  const totalPages = Math.ceil(filteredLoots.length / lootsPerPage);

  return (
    <div>
      <ToastContainer />
      <CCard>
        <CCardBody>
          <h5 className="mb-4">Loots History</h5>

          <CFormInput
            placeholder="Search by username or player ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />

          <CTable striped hover responsive bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell>Amount (₹)</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {currentLoots.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="4" className="text-center">No loot history available.</CTableDataCell>
                </CTableRow>
              ) : (
                currentLoots.map((loot, index) => (
                  <CTableRow key={loot._id}>
                    <CTableDataCell>{indexOfFirstLoot + index + 1}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex align-items-center gap-2">
                        <CAvatar size="sm" src={renderAvatar(loot.user_id?.avatar)} />
                        <div>
                          <div>{loot.user_id?.user_name}</div>
                          <small>{loot.user_id?.player_id}</small>
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>₹{loot.amount}</CTableDataCell>
                    <CTableDataCell>{new Date(loot.createdAt).toLocaleString()}</CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <CPagination>
                {Array.from({ length: totalPages }, (_, i) => (
                  <CPaginationItem
                    key={i}
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

export default LootsHistory;
