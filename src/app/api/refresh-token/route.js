import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken');

        const response = await axios.post(`${process.env.BACKEND_URL}/auth/refresh`, {
            headers: {
                "Authorization": `Bearer ${refreshToken}`
            }
        });
        cookieStore.set("accessToken", data.access_token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60,
        });

        cookieStore.set("refreshToken", data.refresh_token,{
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
        const message = error.response?.data || "Internal Server Error"

        return NextResponse.json(
            {error: message},
            { status: status}
        )
    }
}