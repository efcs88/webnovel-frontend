'use client';

import {
  useState,
  useCallback,
  DragEvent,
  ChangeEvent,
  useRef,
} from "react";
import {
  Upload,
  Check,
} from "lucide-react";

const MAX_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

interface ImageUploadProps {
  onFileSelected: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>();

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_SIZE) {
      alert("El archivo supera los 2MB");
      return false;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Tipo de archivo no permitido");
      return false;
    }

    return true;
  };

  const loadFile = (selectedFile: File) => {
    if (!validateFile(selectedFile)) return;

    setFile(selectedFile);
    onFileSelected(selectedFile);

    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const droppedFile = e.dataTransfer.files[0];

      if (droppedFile) {
        loadFile(droppedFile);
      }
    },
    []
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setCoverPreview(undefined);
    onFileSelected(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-2">
          Subir portada
        </h2>

        <p className="text-gray-600 mb-6">
          Arrastra una imagen o haz clic para seleccionarla
        </p>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-blue-400 rounded-xl p-10 text-center cursor-pointer hover:bg-blue-50"
        >
          <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />

          <div className="font-medium">
            <p>Arrastra un archivo aquí</p>
            <p className="text-sm text-gray-500">
              Máximo 2MB (JPG, PNG, WEBP)
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            hidden
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileSelect}
          />
        </div>

        {file && (
          <div className="mt-6">

            <h3 className="font-semibold text-center mb-3">
              Vista previa
            </h3>

            <img
              src={coverPreview}
              alt="Portada"
              className="w-full h-64 object-cover rounded-lg border"
            />

            <div className="mt-3 text-center">
              <p className="font-medium truncate ...">{file.name}</p>

              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="btn btn-error w-full mt-5"
            >
              Eliminar imagen
            </button>

            <div className="mt-4 flex justify-center items-center gap-2 text-green-600">
              <Check />
              <span>Imagen lista para subir</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ImageUpload;