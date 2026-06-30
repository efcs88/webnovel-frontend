import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken");
        
        const response = await axios.get(
            `${process.env.BACKEND_URL}/novels/usr`,
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