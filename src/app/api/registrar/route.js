import axios from "axios";
import { error } from "console";
import { NextResponse } from "next/server";



export async function POST(request) {
    try{
        const { username, email, password } = await request.json();
        
        const cookieStore = await cookies();

        const response = await axios.post(`${process.env.BACKEND_URL}/auth/register`,{
            username,
            email,
            password
        });
        const data = response.data;

        cookieStore.set("accessToken", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60,
        });

        return NextResponse.json(data, {
            status: response.status,
        })
    }catch(error){
            const status = error.response?.status || 500;
            const message = error.response?.data || "Internal Server Error"
        return NextResponse.json(
            { error: message},
            { error: status}
        )
    }
    
}