import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="me-1">Unique Teen Patti &copy; 2025</span>
        <span>Made by Premad Software Solution Pvt. Limited</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="http://premad.in/" target="_blank" rel="noopener noreferrer">
          Premad Software
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
