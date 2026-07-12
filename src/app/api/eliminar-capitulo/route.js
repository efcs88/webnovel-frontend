import axios from "axios";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function DELETE(request) {
    try{
        
    const formData = await request.formData();
    const chapterId = formData.get("chapterId")
    const cookieStore = await cookies();
    
    console.log(chapterId)
    const token = cookieStore.get("accessToken");

    const response = await axios.delete(
        `${process.env.BACKEND_URL}/chapters/${chapterId}`,
        {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        }
    );
        const data = response.data
        return NextResponse.json(data, {
            status: response.status
        });
    }catch(error){
        const status = error.response?.status || 500;
        const message = error.response?.data || "Internal Server Error"

        return NextResponse.json(
            {error: message},
            {status: status}
        )
    }
    
}