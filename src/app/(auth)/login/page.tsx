'use client'
import NavBar from '@/src/components/NavBar';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if(response.status == 401){
      setMessageError(data.error);
    }
    if(response.status == 500){
      setMessageError("Error interno del servidor intente mas tarde");
      router.refresh();
    }
    if(response.ok){
      router.push("/dashboard");
    }
  }
  return (
    <div>
      <NavBar/>
      <div className='flex justify-center h-screen'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <label className='block text-2xl font-medium'>Cree una cuenta</label>
           <div className="divider"></div>
            <div className='form-control'>
              {messageError && <label className='block text-sm font-medium text-red-600'>{messageError}</label>}
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
                className='appearance-none text-white block w-150 px-3 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
              {isLoading ? (
                <div className='mt-2 flex justify-center items-center'>
                  <span className='loading loading-spinner loading-md'></span>
                  <button type='submit' disabled={true} className='btn btn-primary'>Singup</button>
                </div>
              ) : (
                <div className='mt-2 flex justify-center items-center'>
                  <button type='submit' className='btn btn-primary'>Singup</button>
                </div>
              )}
            </div>
        </form>
      </div>
      
    </div>
  )
}
