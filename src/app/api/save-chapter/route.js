import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";


export async function PUT(request) {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken");

        const chapterId = request.headers.get("chapterId");

        const body = await request.json();
        const { title, content } = body;
        const response = await axios.put(
            `${process.env.BACKEND_URL}/chapters/${chapterId}`,
            {
                title: title,
                content: content,
            },
            {
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                },
            }
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