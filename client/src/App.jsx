import React, { use } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
// import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { useDispatch } from 'react-redux'
import { login, setLoading } from './app/features/authSlice'
import api from './configs/api'
import { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'
import About from './pages/About'

const App = () => {

  const dispatch = useDispatch()
  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if(token) {
        const {data} = await api.get('/api/users/data', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(data.user) {
          dispatch(login({user: data.user, token}))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }

useEffect(() => {
  getUserData()
}, [])

    return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} /> {/*default child route for /app*/}
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
        {/* <Route path='login' element={<Login />} /> */}
        
        <Route path='/about' element={<About />} />
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