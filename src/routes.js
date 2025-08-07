import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserList = React.lazy(() => import('./views/pages/users/UserList.js'))


const BootList = React.lazy(() => import('./views/pages/boots/BootList.js'))
const BootForm = React.lazy(() => import('./views/pages/boots/BootForm.js'))

const WalletTransactionList = React.lazy(() => import('./views/pages/wallet_transactions/List.js'))

const RoomList = React.lazy(() => import('./views/pages/rooms/List.js'))
const RoomShow = React.lazy(() => import('./views/pages/rooms/Show.js'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: UserList },
  { path: '/boots', name: 'Boots', element: BootList },
  { path: '/boots/create', name: 'Boots', element: BootForm },
  { path: '/boots/edit/:id', name: 'Edit Boot', element: BootForm },

  { path: '/wallet_transactions', name: 'Wallet Transactions', element: WalletTransactionList },

  { path: '/rooms', name: 'Rooms', element: RoomList },
  { path: '/rooms/show/:id', name: 'Show Room', element: RoomShow },



]

export default routes
