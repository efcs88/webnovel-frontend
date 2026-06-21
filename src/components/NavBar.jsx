'use client'

import { useRouter } from 'next/navigation';
import { Router } from 'next/navigation';
import React, { useState } from 'react'

const NavBar = () => {
  
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginRedirect = () => {
    if(loading) return;
    setLoading(true);
    router.push("/login");
  }
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">webnovel</a>
      </div>
      
      <div className="flex-none">
        
        {isLogin ?(
          <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>      
        ):(
        <ul className='menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box'>
          <li>
            <button onClick={handleLoginRedirect} className='btn btn-ghost' >
              {loading ? "Cargando..." : "Login"}
            </button>
          </li>
          <li><a href="registro">Singup</a></li>
        </ul>
      )}
      </div>
    </div>
  )
}

export default NavBar;