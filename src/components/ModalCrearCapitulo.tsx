import { useState } from "react";

interface ChapterModalProps  {
  novelId?: string;
}


const ModalCrearCapitulo = ( {novelId}: ChapterModalProps) => {
    const [titulo, setTitulo] = useState('');
    const [messageError, setMessageError] = useState('');
    const formData = new FormData();

    const handleCreate: React.SubmitEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();
        formData.append("title", titulo);
        formData.append("content", "");
        formData.append("novelId", String(novelId));
        const response = await fetch("/api/registrar-capitulo",{
            method: "POST",
            body:formData,
        });
        const data = await response.json();

        if(response.status == 401){
            setMessageError(data.console.error());
        }
    }
     return (
        <>
        <button
          className="btn"
          onClick={() => {const d = document.getElementById('my_modal_1') as HTMLDialogElement | null; d?.showModal();}}
        >Crear capitulo</button>
        <dialog id="my_modal_1" className="modal">
          <form className='space-y-6' onSubmit={handleCreate}>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Creando Capitulo</h3>
              <p className="py-4">Dale un titulo al capitulo no te preocupes puedes cambiarlo despues</p>
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
    );
}

export default ModalCrearCapitulo;