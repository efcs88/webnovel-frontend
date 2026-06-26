'use client'
import React from 'react'

const ModalCrearNovela = () => {
  return (
    <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Creando Novela</h3>
            <p className="py-4">Llena los elementos para crear una novela</p>
                <div className='divider'></div>
                <div>
                    <label>Titulo</label>
                <div className='mt-1'>
                <input 
                id="title" 
                name="title"
                type='title'
                required
                value=""
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Titulo"
                className='appearance-none text-white block px-3 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
              </div>
                </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
    </>
  )
}

export default ModalCrearNovela;
