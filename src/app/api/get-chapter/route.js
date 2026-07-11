import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";


export async function GET(request) {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken");
        const chapterId = request.headers.get("chapterId");
        const response = await axios.get(
            `${process.env.BACKEND_URL}/chapters/${chapterId}`,
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