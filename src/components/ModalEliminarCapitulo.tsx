'use client'

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ChapterModalProps {
  chapterId?: string;
}

const ModalEliminarCapitulo = ({ chapterId }: ChapterModalProps) => {
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
    formData.append("chapterId", String(chapterId));

    try {
      const response = await fetch("/api/eliminar-capitulo", {
        method: "DELETE",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessageError(data.message ?? "No se pudo eliminar el capítulo");
      } else {
        closeModal();
        toast.success("Capítulo eliminado");
        router.refresh();
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
        Eliminar capítulo
      </button>

      <dialog ref={dialogRef} className="modal">
        <form onSubmit={handleDelete} className="space-y-4">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Eliminar capítulo</h3>

            <p className="py-2 text-sm opacity-70">
              ¿Seguro que deseas eliminar este capítulo?
            </p>

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

export default ModalEliminarCapitulo;