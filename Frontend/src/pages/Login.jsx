import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('');
        try {
            const response = await API.post('/auth/login', { email, password })
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed')
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <h2 className='text-center text-3xl font-extrabold text-gray-900'>Log in</h2>
                <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                            <input 
                                type='email' 
                                id='email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' 
                                placeholder='' 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                            <input 
                                type='password' 
                                id='password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className='mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' 
                                placeholder='' 
                                required 
                            />
                        </div>
                        <button 
                            type='submit' 
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Log in
                        </button>
                        {error && <p className='mt-2 text-center text-red-500'>{error}</p>}
                        <p className='mt-2 text-center text-gray-600'>Don't have an account? <Link to='/signup' className='text-indigo-500 hover:text-indigo-600'>Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
