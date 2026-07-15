'use client'
import ModalCrearCapitulo from "@/src/components/ModalCrearCapitulo";
import SideBar from "@/src/components/SideBar"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"
import ModalEliminarCapitulo from "@/src/components/ModalEliminarCapitulo";

interface Chapter {
    id: number,
    title: string,
    content: string,
    novelId: number
}

export default function Capitulos() {

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [selectedChapterId, setSelectedChapterId] = useState<string>("");
    const router = useRouter();

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

    const verNovela = (id: number) => {
        router.push(`/novels/${novelId}/chapters/${id}`);
    }

    return (
        <SideBar>

            <div className="h-screen flex flex-col">
                <h1 className="text-center py-4">Tus capítulos</h1>
                <div className="items-center justify-center">
                    <p>Lista de capítulos</p>
                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>titulo</th>
                            <th>Contenido</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                        {chapters.map((chapter,index) => (
                          <tr key={chapter.id}>
                            <th>{index+1}</th>
                            <td>{chapter.title}</td>
                            <td>
                              {chapter.content
                                ? (() => {
                                    const text = JSON.parse(chapter.content).content?.[0]?.content?.[0]?.text ?? "";
                                    return text.length > 50 ? text.substring(0, 50) + "..." : text;
                                  })()
                                : "Capítulo vacío"}
                            </td>
                            <td>
                              <button onClick={() => verNovela(chapter.id)} className="btn btn-primary btn-ghost">
                                   Ver
                              </button>
                              <ModalEliminarCapitulo
                                  chapterId={String(chapter.id)}
                                  onDelete={getChapters}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                      </table>
                    </div>
                    
                    <ModalCrearCapitulo novelId={String(novelId)}/>
                </div>
            </div>
        </SideBar>
    )

}