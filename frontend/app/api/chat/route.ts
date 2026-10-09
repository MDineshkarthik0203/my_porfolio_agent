import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
    
    // Proxy request to FastAPI backend (if deployed or running locally)
    const backendRes = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    // If backend is restarting, cold-starting, or unreachable, seamlessly fall back
  }

  // Fallback if backend is restarting or unreachable
  return NextResponse.json({
    fallback: true,
  });
}
