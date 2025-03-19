import { apiHandler } from "@/utilities/apiHandler";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return apiHandler(request, {
    endpoint: `/api/teachers/${params.id}/schedule`,
  });
}
