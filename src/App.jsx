import React from 'react'
import { Outlet } from 'react-router-dom'

import './styles/_colors.css'
import './styles/global.css'

import styles from './styles.css'

const App = () => (
  <div className={styles['app-container']}>
    <Outlet />
  </div>
)
export default App
