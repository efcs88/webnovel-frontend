'use client'
import { useParams } from "next/navigation"
import SideBar from "@/src/components/SideBar"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useEffect, useState } from "react"
import type { JSONContent } from "@tiptap/core"
import axios from "axios"
import toast from "react-hot-toast"

interface Chapter {
    id: number,
    title: string,
    content: string,
    novelId: number
}

export default function Capitulo( ) {
    const { novelId, chapterId } = useParams();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [content, setContent] = useState<JSONContent | undefined>(undefined);
    const [isSaving, setIsSaving] = useState(false);

    const getChapter = async () => {
      try{
        const response = await axios.get("/api/get-chapter", {
          headers: {
            'chapterId': chapterId
          }
        });
        setChapter(response.data);
        setContent(JSON.parse(response.data.content) as JSONContent);
      }catch (error) {
        if( axios.isAxiosError(error) && error.response?.status === 403){
          try{
            const refreshResponse = await axios.post("/api/refresh-token");
            const response = await axios.get("/api/get-chapter", {
              headers: {
                'chapterId': chapterId
              }
            });
            setChapter(response.data);
          }catch (refreshError) {
            console.log("Error al refrescar el token:", refreshError);
          }
        }else{
          console.log(error);
        }
      }
    };

    const saveChapter = async () => {
      toast.promise(
        axios.put(
          "/api/save-chapter",
          {
            title: chapter?.title,
            content: JSON.stringify(content)
          },
          {
            headers: {
              chapterId: chapterId
            }
          }
        ),
        {
          loading: 'Guardando...',
          success: 'Guardado',
          error: 'No se pudo guardar',
        }
      );
    };

    useEffect(() => {
      getChapter();
    }, []);

    useEffect( () => {
      
    },[content]);



    return (
        <SideBar >
            <div className="h-screen flex flex-col">
              {chapter && (
                <>
                  <div className="flex flex-col">
                    <h1 className="text-center py-4">{chapter.title}</h1>
                    <button className="btn btn-primary"
                    onClick={saveChapter}>Guardar</button>
                  </div>
                  <div className="items-center justify-center flex flex-col">
                    <SimpleEditor
                      content={content}
                      onChange={setContent}
                    />
                  </div>
                </>
              )}
            </div>
        </SideBar>
    )

}