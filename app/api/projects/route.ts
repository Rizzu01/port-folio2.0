import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch("https://www.creativerizz.in/api/pinterest/pins", {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error("Portfolio feed unavailable");
    const data = await response.json();
    return NextResponse.json({
      configured: Boolean(data?.configured),
      pins: Array.isArray(data?.pins) ? data.pins : [],
    }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch {
    return NextResponse.json({ configured: false, pins: [], message: "Live portfolio feed is temporarily unavailable." }, { status: 200 });
  }
}
