import { apiHandler } from "@/utilities/apiHandler";

// Обработчик GET запросов
export async function GET(request: Request) {
  return apiHandler(request, {
    endpoint: "/api/user/profile",
  });
}

// Обработчик PATCH запросов для обновления профиля
export async function PATCH(request: Request) {
  return apiHandler(request, {
    endpoint: "/api/user/profile",
    method: "PATCH",
  });
}
