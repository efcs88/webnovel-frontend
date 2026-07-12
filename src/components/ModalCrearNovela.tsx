'use client'
import React, { useState } from 'react'
import ImageUpload from './upload-image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ModalCrearNovela = () => {

  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [description, setDescription] = useState('');
  const [messageError, setMessageError] = useState('');
  const  [cover, setCover] = useState<File | null>(null);
  const [isLoadin, setIsLoadin] = useState(false);

  const closeModal = () => {
    const d = document.getElementById('my_modal_1') as HTMLDialogElement | null;
    d?.close();
  }

 const handleCreate: React.SubmitEventHandler<HTMLFormElement> =  async(e) => {
    e.preventDefault();
    setIsLoadin(true);
    setMessageError('');

    const formData = new FormData();
    formData.append("title", titulo);
    formData.append("description", description);
    if(cover){
      formData.append("imagen", cover)
    }

    try {
      console.log("1. Antes del fetch");
      const response = await fetch("/api/registrar-novela",{
        method: "POST",
        body:formData,
      });
      console.log("2. Response status:", response.status);

      const data = await response.json();
      console.log("3. Data recibida:", data);

      if(response.status == 401){
        console.log("4. Entrando al bloque de error 401");
        setMessageError(data.message ?? "No se pudo crear la novela");
      } else {
        console.log("5. Entrando al bloque de éxito");
        closeModal();
        setTitulo('');
        setDescription('');
        setCover(null);
        console.log("6. A punto de llamar toast.success");
        toast.success("Novela creada");
        console.log("7. toast.success ejecutado");
        router.refresh();
      }
    } catch (error) {
      console.log("ERROR CAPTURADO:", error);
      setMessageError("Ocurrió un error inesperado");
    } finally {
      setIsLoadin(false);
      console.log("8. Finally ejecutado, isLoadin en false");
    }
}

  return (
    <>
        <button
          className="btn btn-primary"
          onClick={() => {const d = document.getElementById('my_modal_1') as HTMLDialogElement | null; d?.showModal();}}
        >Crear novela</button>
        <dialog id="my_modal_1" className="modal">
          <form className='space-y-4' onSubmit={handleCreate}>
            <div className="modal-box">
              <h3 className="font-bold text-xl">Creando Novela</h3>
              <p className="py-2 text-sm opacity-70">Dale un nombre a tu Novela no te preocupes puedes cambiarlo despues</p>
              <div className='divider my-2'></div>

              {messageError && (
                <div role="alert" className="alert alert-error py-2 text-sm mb-4">
                  <span>{messageError}</span>
                </div>
              )}

              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text font-medium'>Titulo</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type='text'
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Titulo"
                  className='input input-bordered w-full focus:input-primary'
                />
              </div>

              <div className='form-control w-full py-4'>
                <label className='label'>
                  <span className='label-text font-medium'>Descripción</span>
                </label>
                <input
                  id="description"
                  name="description"
                  type='text'
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descricion"
                  className='input input-bordered w-full focus:input-primary'
                />
              </div>

              <div className='py-2'>
                <ImageUpload 
                 onFileSelected={setCover}/>
              </div>

              <div className="modal-action">
                {isLoadin ? (
                  <button type='submit' disabled className='btn btn-primary btn-wide'>
                    <span className='loading loading-spinner loading-sm'></span>
                    Creando...
                  </button>
                ) : (
                  <>
                    <button type='submit' className='btn btn-primary'>Crear</button>
                    <button
                      type='button'
                      className='btn btn-error btn-outline'
                      onClick={closeModal}
                    >Cancelar</button>
                  </>
                )}
              </div>
            </div>
          </form>
        </dialog>
    </>
  )
}

export default ModalCrearNovela;