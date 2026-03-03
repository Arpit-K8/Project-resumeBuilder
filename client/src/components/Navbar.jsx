import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' 

const Navbar = () => {
    const user ={name:"John Doe"}
    const Navigate = useNavigate();

    const logoutUser = () => {
        console.log("User logged out");
        Navigate('/login');
    }
  return (
    <div className='shadow bg-black border-b border-slate-700'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5'>
            <Link to="/" >
                <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
            </Link>
            <div className='flex items-center text-sm gap-4 text-white'>
                <p>Hi {user?.name}</p>
                <button onClick={logoutUser} className='bg-slate-800 hover:bg-slate-700 border border-slate-600 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar