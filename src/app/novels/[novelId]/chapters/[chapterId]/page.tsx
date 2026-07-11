'use client'
import { useParams } from "next/navigation"
import SideBar from "@/src/components/SideBar"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useEffect, useState } from "react"
import axios from "axios"

interface Chapter {
    id: number,
    title: string,
    content: string,
    novelId: number
}

export default function Capitulo( ) {
    const { novelId, chapterId } = useParams();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const getChapter = async () => {
      try{
        const response = await axios.get("/api/get-chapter", {
          headers: {
            'chapterId': chapterId
          }
        });
        setChapter(response.data);
        setContent(response.data.content);
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
      console.log("Guardando capitulo:", chapterId, "con contenido:", content);
      await axios.post("/api/save-chapter", {
        id: chapterId,
        content: content
      });
    };

    useEffect(() => {
      getChapter();
    }, []);




    useEffect( () => {
      console.log("Content", content)
    },[content]);


    return (
        <SideBar>
            <div className="h-screen flex flex-col">
                <h1 className="text-center py-4">{chapter?.title}</h1>
                <div className="items-center justify-center">
                    <SimpleEditor 
                    content={content}
                    onChange={(e) =>  setContent}/>
                </div>
            </div>
        </SideBar>
    )

}