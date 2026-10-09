import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Proxy request to FastAPI backend
    const backendRes = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // 10 second timeout
      signal: AbortSignal.timeout(10000),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.warn("Backend proxy error:", err);
  }

  // Fallback if backend is restarting or unreachable
  return NextResponse.json({
    fallback: true,
  });
}
