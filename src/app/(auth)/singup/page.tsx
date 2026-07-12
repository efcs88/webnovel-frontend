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
      <div className='flex justify-center items-center min-h-screen bg-base-200 px-4'>
        <form className='ard w-full max-w-md bg-base-100 shadow-xl space-y-6 p-8' onSubmit={handleSubmit}>
          <label className='block text-2xl font-bold text-center'>Cree una cuenta</label>
           <div className="divider"></div>
            <div className='mt-1 form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Username</span>
              </label>
              <div>
                <input 
                id="username" 
                name="username"
                type='username'
                autoComplete='username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className='input input-bordered w-full focus:input-primary'/>
              </div>
            </div>
              <div className='mt-1 form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>email</span>
              </label>
              <input 
                id='email' 
                name='email' 
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                className='input input-bordered w-full focus:input-primary'
              /> 
            </div>
            <div className='mt-1 form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Contraseña</span>
              </label>
              <input 
                id="password" 
                name='password' 
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Contraseña'
                className='input input-bordered w-full focus:input-primary'
              />
            </div>
            <div className='mt-2 flex justify-center items-center'>
              <button type='submit'className='btn btn-primary btn-wide'>Singup</button>
            </div>
        </form>
      </div>
      
    </div>
    
  )
}
