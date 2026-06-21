'use client'
import React, { useState } from 'react'
import NavBar from '@/src/components/NavBar';

export default function Registrar() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  }
  
  return (
    <div>
      <NavBar/>
      <div className='flex justify-center h-screen'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <label>Cree una cuenta</label>
           <div className="divider"></div>
            <div className='form-control'>
              <label className='block text-sm font-medium text-gray-700'>
                Username
              </label>
              <div className='mt-1'>
                <input 
                id="username" 
                name="username"
                type='username'
                autoComplete='username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className='appearance-none text-white block w-150 px-3 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
              </div>
            </div>
            <div className='mt-1'>
              <label className='block text-sm font-medium text-gray-700'>email</label>
              <input 
              id='email' 
              name='email' 
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='email'
              className='appearance-none text-white block w-full px-3 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              /> 
            </div>
            <div className='mt-1'>
              <label className='block text-sm font-medium text-gray-700'>Contraseña</label>
              <input 
              id="password" 
              name='password' 
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='Contraseña'
              className='appearance-none text-white block w-full px-3 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
            </div>
            <button type='submit'className='btn btn-primary'>Singup</button>
        </form>
      </div>
      
    </div>
    
  )
}
