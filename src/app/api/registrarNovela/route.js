import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request) {
    try{
        const cookieStore = await cookies();
        
        const { title, description, coverImage, user_id } = await request.json();
        const refreshToken = cookieStore.get('refreshToken');

        const body = {
            title,
            description,
            coverImage,
            user_id
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