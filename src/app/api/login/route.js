import { Axios } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { request } from "node:http";

export async function POST(request) {
    try{
        //console.log("Request: ", request)
        const formData = await request.json();

        const { email, password}

        const cookieStore = await cookies();

        const response = await Axios.post(`${process.env.BACKEND_URL}/auth/login`,{
            body: formData
        });
        const data = await response.json();
        console.log("Respuesta del servidor java: " + response);
        cookieStore.set("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        return NextResponse.json(data, {
            status: response.status,
        });
    }catch(error){
        console.error('API login error', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            { status: 500 }
        )
    }
    
} 
