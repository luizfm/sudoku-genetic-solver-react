import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom'

import App from '../App'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" element={<App />} />
    </Switch>
  </Router>
)

export default Routes
