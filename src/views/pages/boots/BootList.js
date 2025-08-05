import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  CCard, CCardBody, CTable, CTableHead, CTableHeaderCell,
  CTableRow, CTableBody, CTableDataCell, CButton,
  CModal, CModalHeader, CModalBody, CModalFooter,
  CFormInput, CPagination, CPaginationItem
} from '@coreui/react';

const BootList = () => {
  const [boots, setBoots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBoots();
  }, []);

  const fetchBoots = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/boots');
      setBoots(response.data || []);
    } catch (error) {
      console.error('Error fetching boots:', error);
      toast.error('Failed to fetch boots');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setVisibleModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/boots/${deleteId}`);
      toast.success(res.data.message || 'Boot deleted successfully');
      setVisibleModal(false);

      // Refresh data
      const updatedBoots = boots.filter((boot) => boot._id !== deleteId);
      setBoots(updatedBoots);

      if (updatedBoots.length <= (currentPage - 1) * itemsPerPage && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete boot');
    }
  };

  // Filter boots by search term
  const filteredBoots = boots.filter((boot) =>
    String(boot.boot_amount).includes(searchTerm) ||
    String(boot.max_blind).includes(searchTerm) ||
    String(boot.max_chaal).includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBoots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBoots = filteredBoots.slice(startIndex, startIndex + itemsPerPage);

  return (

    <div>
      <ToastContainer />
      <CCard className="">
        <CCardBody>
          <div className="d-flex justify-content-between mb-3">
            <h5>Teen Patti Boot Settings</h5>
            <Link to="/boots/create">
              <CButton color="primary">+ Add Boot</CButton>
            </Link>
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

          <CTable striped hover responsive bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                <CTableHeaderCell>Boot Amount</CTableHeaderCell>
                <CTableHeaderCell>Max Blind</CTableHeaderCell>
                <CTableHeaderCell>Max Chaal</CTableHeaderCell>
                <CTableHeaderCell>Max Pot</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedBoots.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="7" className="text-center">No boots found.</CTableDataCell>
                </CTableRow>
              ) : (
                paginatedBoots.map((boot, index) => (
                  <CTableRow key={boot._id}>
                    <CTableDataCell className="text-center">
                      {startIndex + index + 1}
                    </CTableDataCell>
                    <CTableDataCell>{boot.boot_amount}</CTableDataCell>
                    <CTableDataCell>{boot.max_blind}</CTableDataCell>
                    <CTableDataCell>{boot.max_chaal}</CTableDataCell>
                    <CTableDataCell>{boot.max_pot_amount}</CTableDataCell>
                    <CTableDataCell>{boot.status ? 'Active' : 'Inactive'}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/boots/edit/${boot._id}`}>
                        <CButton color="warning" size="sm" className="me-2">Edit</CButton>
                      </Link>
                      <CButton color="danger" size="sm" onClick={() => handleDeleteClick(boot._id)}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>

          {/* Pagination Controls */}
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

      {/* Delete Confirmation Modal */}
      <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <CModalHeader onClose={() => setVisibleModal(false)}>
          Confirm Delete
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this boot?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleModal(false)}>Cancel</CButton>
          <CButton color="danger" onClick={confirmDelete}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default BootList;
