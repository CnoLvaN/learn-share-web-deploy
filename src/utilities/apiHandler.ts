import { NextResponse } from "next/server";
import https from "node:https";

/**
 * Функция-обработчик для создания API маршрутов в Next.js App Router,
 * которые проксируют запросы к внешнему HTTP API.
 */
export async function apiHandler(
  request: Request,
  config: {
    endpoint: string;
    method?: string;
  }
) {
  try {
    const { endpoint, method = request.method } = config;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Получаем авторизационный заголовок из оригинального запроса
    const authHeader = request.headers.get("Authorization");

    // Получаем данные из запроса для методов, которые могут иметь тело
    let body: Record<string, unknown> | null = null;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      const contentType =
        request.headers.get("Content-Type") || "application/json";
      if (contentType.includes("application/json")) {
        try {
          body = await request.json();
        } catch {
          // Игнорируем ошибку, если тело не может быть преобразовано в JSON
        }
      }
    }

    // Добавляем параметры запроса, если они есть
    const url = new URL(request.url);
    const targetUrl = new URL(`${apiUrl}${endpoint}`);

    // Копируем все параметры запроса
    url.searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    // Установка опций для fetch
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Добавляем тело запроса, если есть
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    // Добавляем заголовок авторизации, если есть
    if (authHeader) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: authHeader,
      };
    }

    // Для небезопасных HTTP запросов на сервере
    // @ts-expect-error - agent опция доступна только в Node.js
    fetchOptions.agent = new https.Agent({
      rejectUnauthorized: false,
    });

    console.log(`Sending ${method} request to ${targetUrl.toString()}`);

    // Перенаправляем запрос на внешний API
    const response = await fetch(targetUrl.toString(), fetchOptions);

    // Для запросов, которые должны возвращать JSON
    if (["GET", "POST"].includes(method)) {
      try {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } catch {
        // Если ответ не содержит JSON, возвращаем пустой ответ
        return new Response(null, {
          status: response.status,
          statusText: response.statusText,
        });
      }
    }

    // Для запросов, которые возвращают только статус
    return new Response(null, {
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    console.error(`Error in API handler: ${error}`);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}
