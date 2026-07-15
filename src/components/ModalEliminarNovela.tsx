'use client'

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ChapterModalProps {
  novelId?: string;
  onDelete: () => Promise<void>;
}

const ModalEliminarNovela = ({ novelId, onDelete }: ChapterModalProps) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [messageError, setMessageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleDelete: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageError("");
    const formData = new FormData();
    formData.append("novelId", String(novelId));

    try {
      const response = await fetch("/api/eliminar-novela", {
        method: "DELETE",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessageError(data.message ?? "No se pudo eliminar el novela");
      } else {
        await onDelete();
        closeModal();
        toast.success("Novela eliminado");
      }
    } catch (error) {
      setMessageError("Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline btn-error"
        onClick={() => dialogRef.current?.showModal()}
      >
        Eliminar novela
      </button>

      <dialog ref={dialogRef} className="modal">
        <form onSubmit={handleDelete} className="space-y-4">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Eliminar novela</h3>

            <p className="py-2 text-sm ">
              ¿Seguro que deseas eliminar esta novela?
            </p>
            <p className="py-2 text-sm">NOTA:No debe contener ningun capitulo</p>
            {messageError && (
              <div className="alert alert-error">
                <span>{messageError}</span>
              </div>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={closeModal}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-error"
                disabled={isLoading}
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default ModalEliminarNovela;