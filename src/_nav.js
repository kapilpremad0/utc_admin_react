import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilGamepad,
  cilHistory,
  cilMemory,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilRoom,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilWallet
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'No Limit Table',
    to: '/boots',
    icon: <CIcon icon={cilGamepad} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Rooms',
    to: '/rooms',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Wallet Transaction',
    to: '/wallet_transactions',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Loot History',
    to: '/loots',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },

]

export default _nav
