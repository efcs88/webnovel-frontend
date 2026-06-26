import SideBar from '@/src/components/SideBar'
import ModalCrearNovela from '@/src/components/ModalCrearNovela'
import React from 'react'

export default function Novels(){
  return (
    <SideBar>
      <div className='h-screen flex flex-col'>
        <h1 className='text-center py-4'>Novels</h1>
        <div className='flex-1 flex items-center justify-center'>
          <ModalCrearNovela/>
          
        </div>
      </div>
    </SideBar>
  )
}
