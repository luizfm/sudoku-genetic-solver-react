import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from 'react-router-dom'

import Home from '_views/home'
import App from '../App'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
    </Switch>
  </Router>
)

export default Routes
