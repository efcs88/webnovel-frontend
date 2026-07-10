'use client'
import ModalCrearCapitulo from "@/src/components/ModalCrearCapitulo";
import SideBar from "@/src/components/SideBar"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"

interface Chapter {
    id: number,
    title: string,
    content: string,
    novelId: number
}

export default function Capitulos() {

    const [chapters, setChapters] = useState<Chapter[]>([]);

    const { novelId } = useParams();
    const getChapters = async () => {
        try{
            const response = await axios.get("/api/get-chapters", {
              headers: {
                'novelId': novelId
              }
            });
            setChapters(response.data);
        } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
         try {
            const refreshResponse = await axios.post("/api/refresh-token");
            const response = await axios.get("/api/get-novels");
            setChapters(response.data);
          } catch (refreshError) {
            console.log("Error al refrescar el token:", refreshError);
          }
        }
      } else {
        console.log(error);
      }
    }
    };

    useEffect(() => {
        getChapters();
    }, []);

    return (
        <SideBar>
            <div className="h-screen flex flex-col">
                <h1 className="text-center py-4">Tus capítulos</h1>
                <div className="items-center justify-center">
                    <p>Lista de capítulos</p>
                    {chapters.map((chapter) => (
                        <div key={chapter.id} className="border p-4 mb-2 rounded-lg">
                            <h2 className="text-lg font-semibold">{chapter.title}</h2>
                            <p className="text-gray-600">{chapter.content}</p>
                        </div>
                    ))}
                    <ModalCrearCapitulo novelId={String(novelId)}/>
                </div>
            </div>
        </SideBar>
    )

}