'use client'
import React, { useState } from 'react'
import ImageUpload from './upload-image';
import axios from 'axios';

const ModalCrearNovela = () => {

  const [titulo, setTitulo] = useState('');
  const [description, setDescription] = useState('');
  const  [cover, setCover] = useState<File | null>(null);
  const formData = new FormData();

  const handleCreate: React.SubmitEventHandler<HTMLFormElement> =  async(e) => {
    e.preventDefault();
    formData.append("tittle", titulo);
    formData.append("description", description);
    if(cover){
      formData.append("cover", cover);
    }
    console.log(formData);
    await axios.post(`/api/novelas`, FormData)
  }

  return (
    <>
        <button
          className="btn"
          onClick={() => {const d = document.getElementById('my_modal_1') as HTMLDialogElement | null; d?.showModal();}}
        >Crear novela</button>
        <dialog id="my_modal_1" className="modal">
          <form className='space-y-6' onSubmit={handleCreate}>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Creando Novela</h3>
              <p className="py-4">Dale un nombre a tu Novela no te preocupes puedes cambiarlo despues</p>
              <div className='divider'></div>
              <div>
                <label>Titulo</label>
                <div className='mt-1'>
                  <input
                    id="title"
                    name="title"
                    type='text'
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Titulo"
                    className='appearance-none text-white block px-3 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
              <div className='py-4'>
                <label >Descripción</label>
                <div className='mt-1'>
                  <input
                    id="description"
                    name="description"
                    type='text'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descricion"
                    className='appearance-none text-white block px-3 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
              <div className='py-4'>
                <ImageUpload 
                 onFileSelected={setCover}/>
              </div>
              <div className="modal-action">
                <button type='submit' className='btn btn-primary'>Crear</button>
                <button
                  type='button'
                  className='btn btn-error'
                  onClick={() => {
                    const d = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                    d?.close();
                  }}
                >Cancelar</button>
              </div>
            </div>
          </form>
        </dialog>
    </>
  )
}

export default ModalCrearNovela;
