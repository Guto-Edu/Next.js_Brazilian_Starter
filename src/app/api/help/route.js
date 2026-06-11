export const runtime = "nodejs";

const endpoints = [
  {
    method: "GET",
    path: "/api/health",
    description: "Verifica se o app está respondendo.",
  },
  {
    method: "GET",
    path: "/api/help",
    description: "Lista endpoints de exemplo disponíveis no starter.",
  },
];

export async function GET() {
  return Response.json(
    {
      name: "Next.js Brazilian Starter API",
      description: "Rotas iniciais para documentação e teste de disponibilidade.",
      endpoints,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
