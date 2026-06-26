import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";
import { error } from "console";

export async function POST(request) {
    try{
        const { email, password} = await request.json();

        const cookieStore = await cookies();

        const response = await axios.post(`${process.env.BACKEND_URL}/auth/login`,{
            email,
            password
        });
        const data = response.data

        if(!data){
            return NextResponse.json(
                {error: "Usuario o contraseña incorrectos"},
                { status: 401}
            );
        }
        cookieStore.set("accessToken", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60, 
        });

        cookieStore.set("refreshToken", data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, 
        });
        
        return NextResponse.json(data, {
            status: response.status
        });

    }catch(error){
        const status = error.response?.status || 500;
        const message = error.response?.data || "Internal Server Error";

        return NextResponse.json(
            {error: message},
            { status: status }
        )
    }
    
} 
