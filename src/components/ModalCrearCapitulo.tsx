'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ChapterModalProps  {
  novelId?: string;
}


const ModalCrearCapitulo = ( {novelId}: ChapterModalProps) => {
    const router = useRouter();
    const [titulo, setTitulo] = useState('');
    const [messageError, setMessageError] = useState('');
    const [isLoadin, setIsLoadin] = useState(false);

    const closeModal = () => {
        const d = document.getElementById('my_modal_1') as HTMLDialogElement | null;
        d?.close();
    }

    const handleCreate: React.SubmitEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();
        setIsLoadin(true);
        setMessageError('');

        const formData = new FormData();
        formData.append("title", titulo);
        formData.append("content", "");
        formData.append("novelId", String(novelId));

        try {
            const response = await fetch("/api/registrar-capitulo",{
                method: "POST",
                body:formData,
            });
            const data = await response.json();

            if(response.status == 401){
                setMessageError(data.message ?? "No se pudo crear el capítulo");
            } else {
                closeModal();
                setTitulo('');
                toast.success("Capítulo creado");
                router.refresh();
            }
        } catch (error) {
            setMessageError("Ocurrió un error inesperado");
        } finally {
            setIsLoadin(false);
        }
    }
     return (
        <>
        <button
          className="btn btn-primary"
          onClick={() => {const d = document.getElementById('my_modal_1') as HTMLDialogElement | null; d?.showModal();}}
        >Crear capitulo</button>
        <dialog id="my_modal_1" className="modal">
          <form className='space-y-4' onSubmit={handleCreate}>
            <div className="modal-box">
              <h3 className="font-bold text-xl">Creando Capitulo</h3>
              <p className="py-2 text-sm opacity-70">Dale un titulo al capitulo no te preocupes puedes cambiarlo despues</p>
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
    );
}

export default ModalCrearCapitulo;