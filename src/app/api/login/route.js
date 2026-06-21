import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { request } from "node:http";
import axios from "axios";

export async function POST(request) {
    try{
        //console.log("Request: ", request)
        const user = await request.json();
 
        const { email, password} = user; 

        const cookieStore = await cookies();

        const response = await axios.post(`${process.env.BACKEND_URL}/auth/login`,{
            email: user.email,
            password: user.password
        });
        const data = response.data

        if(data){
            console.log("Respuesta del servidor java: " + data);
            cookieStore.set("accessToken", data.access_token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return NextResponse.json(data, {
                status: response.status,
            });
        }
        return NextResponse.json("Not found", {
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
