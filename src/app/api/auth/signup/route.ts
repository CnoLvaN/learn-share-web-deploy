import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Получаем данные из запроса
    const body = await request.json();

    // Перенаправляем запрос на внешний API
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Получаем ответ
    const data = await response.json();

    // Возвращаем ответ с соответствующим статусом
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error in signup API route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
