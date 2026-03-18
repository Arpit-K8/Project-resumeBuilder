import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../app/features/authSlice'

const Navbar = () => {
    const {user} = useSelector(state => state.auth)
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const logoutUser = () => {        
        if (isLoggingOut) return

        setIsLoggingOut(true)
        window.setTimeout(() => {
            dispatch(logout())
            Navigate('/')
        }, 650)
    }
  return (
    <div className='shadow bg-black border-b border-slate-700'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5'>
            <Link to="/" >
                <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
            </Link>
            <div className='flex items-center text-sm gap-4 text-white'>
                <p>Hi {user?.name}</p>
                <button
                    onClick={logoutUser}
                    disabled={isLoggingOut}
                    aria-busy={isLoggingOut}
                    className='bg-slate-800 hover:bg-slate-700 disabled:opacity-70 disabled:hover:bg-slate-800 border border-slate-600 px-7 py-1.5 rounded-full active:scale-95 disabled:active:scale-100 transition-all inline-flex items-center gap-2'
                >
                    {isLoggingOut && (
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-90" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    )}
                    <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar