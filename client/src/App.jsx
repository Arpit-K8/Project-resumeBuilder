import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} /> {/*default child route for /app*/}
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='login' element={<Login />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App


/* The index element is the default child route that renders when you visit the parent path exactly. So in this case:
 /app → shows Layout + Dashboard (the indexed child)
 /app/builder/123 → shows Layout + ResumeBuilder 
*/