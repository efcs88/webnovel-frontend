

import axios from "axios";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const formData = await request.formData();

        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken");

        const data = {
            title: formData.get("title"),
            content: formData.get("content"),
            novelId: formData.get("novelId")
        };
        console.log("DATA",data);
        const response = await axios.post(
            `${process.env.BACKEND_URL}/chapters`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                    "Content-Type": "application/json"
                },
            }
        );

        return NextResponse.json(response.data, {
            status: response.status
        });

    } catch (error) {
        return NextResponse.json(
            { error: error.response?.data || "Error" },
            { status: error.response?.status || 500 }
        );
    }
}