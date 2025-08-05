import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'

import { toast } from 'react-toastify'

const BootForm = () => {
  const [formData, setFormData] = useState({
    boot_amount: '',
    max_blind: '',
    max_chaal: '',
    max_pot_amount: '',
    min_buy_in: '',
    max_buy_in: '',
    status: true,
  })

  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/admin/boots/${id}`).then((res) => setFormData(res.data))
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let res
      if (id) {
        res = await axios.put(`http://localhost:5000/api/admin/boots/${id}`, formData)
      } else {
        res = await axios.post('http://localhost:5000/api/admin/boots', formData)
      }

      setFormErrors({})
      toast.success(res?.data?.message || 'Boot saved successfully')  // ✅ Now res is defined
      navigate('/boots')

    } catch (error) {
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors)
        toast.error('Validation failed. Please fix the errors.')
      } else {
        console.error('Unexpected error:', error)
        toast.error(error.response?.data?.message || 'An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }



  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{id ? 'Edit Boot' : 'Create Boot'}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit} >

              <CRow>

                {[
                  ['boot_amount', 'Boot Amount'],
                  ['max_blind', 'Max Blind'],
                  ['max_chaal', 'Max Chaal'],
                  ['max_pot_amount', 'Max Pot Amount'],
                  ['min_buy_in', 'Min Buy-in'],
                  ['max_buy_in', 'Max Buy-in'],
                ].map(([key, label]) => (
                  <CCol xs={4} key={key}>
                    <div className="mb-3">
                      <CFormLabel htmlFor={key}>{label}</CFormLabel>
                      <CFormInput
                        type="number"
                        id={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}

                        invalid={!!formErrors[key]} // mark invalid
                      />
                      {formErrors[key] && (
                        <div className="text-danger" style={{ fontSize: '0.875rem' }}>
                          {formErrors[key]}
                        </div>
                      )}
                    </div>
                  </CCol>
                ))}

              </CRow>
              <div className="mb-3">
                <CFormCheck
                  type="checkbox"
                  name="status"
                  label="Active"
                  checked={formData.status}
                  onChange={handleChange}
                />
              </div>

              <CButton type="submit" color="success">
                {id ? 'Update' : 'Create'}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BootForm
