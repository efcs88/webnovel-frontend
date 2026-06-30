import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken");

        if (!refreshToken) {
            return NextResponse.json(
                { error: "Refresh token not found" },
                { status: 401 }
            );
        }
        const response = await axios.post(
            `${process.env.BACKEND_URL}/auth/refresh`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken.value}`,
                },
            }
        );
        const data = response.data;

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
            status: response.status,
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data },
                { status: error.response?.status || 500 }
            );
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}