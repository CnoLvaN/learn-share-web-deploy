import { apiHandler } from "@/utilities/apiHandler";

export async function GET(request: Request) {
  return apiHandler(request, {
    endpoint: "/api/categories",
  });
}
