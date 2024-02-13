import React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import User from './components/User'

const rootElement = document.getElementById('github-users-list-root')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
