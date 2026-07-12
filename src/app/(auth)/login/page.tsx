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
      <div className='flex justify-center items-center min-h-screen bg-base-200 px-4'>
        <form className='card w-full max-w-md bg-base-100 shadow-xl space-y-6 p-8' onSubmit={handleSubmit}>
          <label className='block text-2xl font-bold text-center'>Inicie sesión</label>
          <div className="divider"></div>
          <div className='form-control space-y-4'>
            {messageError && (
              <div role="alert" className="alert alert-error py-2 text-sm">
                <label className='block text-sm font-medium'>{messageError}</label>
              </div>
            )}
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
            {isLoading ? (
              <div className='mt-2 flex justify-center items-center gap-2'>
                <span className='loading loading-spinner loading-md'></span>
                <button type='submit' disabled={true} className='btn btn-primary btn-wide'>Singup</button>
              </div>
            ) : (
              <div className='mt-2 flex justify-center items-center'>
                <button type='submit' className='btn btn-primary btn-wide'>Singup</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
