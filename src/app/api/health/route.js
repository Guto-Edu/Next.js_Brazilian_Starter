export const runtime = "nodejs";

export async function GET() {
  return Response.json(
    {
      ok: true,
      service: "nextjs-brazilian-starter",
      status: "healthy",
      environment: process.env.NODE_ENV ?? "development",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
