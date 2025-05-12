//lets make a simple navbar component of notes app

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white font-bold text-2xl'>
          Notes App
        </Link>
        <div className='space-x-4'>
          <Link to='/' className='text-white hover:text-gray-300'>
            Home
          </Link>
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className='text-white hover:text-gray-300'
            >
              Logout
            </button>
          ) : (
            <>
              <Link to='/login' className='text-white hover:text-gray-300'>
                Login
              </Link>
              <Link to='/signup' className='text-white hover:text-gray-300'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar