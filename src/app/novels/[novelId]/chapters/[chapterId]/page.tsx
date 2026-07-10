'use client'
import { useParams } from "next/navigation"
import SideBar from "@/src/components/SideBar"

interface Chapter {
    id: number,
    title: string,
    content: string,
    novelId: number
}

export default function Capitulo() {
    const params = useParams();
    const id = params.id;
    return (
        <SideBar>
            <div className="h-screen flex flex-col">
                <h1 className="text-center py-4">Capitulo</h1>
                <div className="items-center justify-center">
                    <p>Post: {id}</p>
                </div>
            </div>
        </SideBar>
    )

}