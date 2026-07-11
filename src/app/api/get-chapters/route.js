import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";


export async function GET(request) {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken");
        const  novelId = request.headers.get("novelId");
        const response = await axios.get(
            `${process.env.BACKEND_URL}/chapters/novel/${novelId}`,
            {
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                },
            },
        );
        return NextResponse.json(response.data, {
            status: response.status,
        });
    } catch (error) {
        const status = error?.response?.status || 500;
        const message = error?.response?.data || { error: 'Internal Server Error' };
        return NextResponse.json(
            {error: message},
            {status: status}
        )
    }
}