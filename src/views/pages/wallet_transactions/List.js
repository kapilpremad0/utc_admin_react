import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import config from '../../../config';

import {
  CCard, CCardBody, CTable, CTableHead, CTableHeaderCell,
  CTableRow, CTableBody, CTableDataCell,
  CFormInput, CPagination, CPaginationItem,
  CAvatar,
} from '@coreui/react';

const WalletTransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/admin/wallet_transactions`);
      setTransactions(response.data || []);
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
      toast.error('Failed to fetch wallet transactions');
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const user = t.user || {};
    const fieldsToCheck = [
      t.amount,
      t.reason,
      t.description,
      t.balance_after,
      t.type,
      user.user_name,
      user.player_id,
    ];

    return fieldsToCheck.some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <ToastContainer />
      <CCard>
        <CCardBody>
          <div className="d-flex justify-content-between mb-3">
            <h5>Wallet Transactions</h5>
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
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell>Amount</CTableHeaderCell>
                <CTableHeaderCell>Reason</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Balance After</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedTransactions.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="7" className="text-center">
                    No transactions found.
                  </CTableDataCell>
                </CTableRow>
              ) : (
                paginatedTransactions.map((tx, index) => (
                  <CTableRow key={tx._id}>
                    <CTableDataCell className="text-center">
                      {startIndex + index + 1}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex align-items-center gap-2">
                        {/* <CAvatar size="md" src={tx.user_id?.avatarUrl} /> */}
                        <div>
                          <div>{tx.user_id?.user_name || 'N/A'}</div>
                          <div className="small text-body-secondary text-nowrap">
                            <span>{tx.user_id?.player_id || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>₹{tx.amount}</CTableDataCell>
                    <CTableDataCell>{tx.reason}</CTableDataCell>
                    <CTableDataCell>{tx.description}</CTableDataCell>
                    <CTableDataCell>{tx.balance_after}</CTableDataCell>
                    <CTableDataCell>{tx.type}</CTableDataCell>
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

export default WalletTransactionList;
