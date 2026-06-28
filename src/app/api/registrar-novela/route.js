import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request) {
    try{
        
        const formData = await request.formData();
        
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken");
        const body = {
            title: formData.get("title"),
            description: formData.get("description"),
            coverImage: formData.get("imagen"),
        }

       const response = await axios.post(`${process.env.BACKEND_URL}/novels`,{
            body,
            headers:{
                "Authorization": `Bearer ${refreshToken}` 
            },
        })
        const data = response.data;

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