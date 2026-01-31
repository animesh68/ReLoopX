import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { lat, lng } = await req.json();

    const query = `
    [out:json];
    node["amenity"="recycling"](around:5000,${lat},${lng});
    out;
    `;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await res.json();

    const enriched = (data.elements || []).map((r: any) => ({
      ...r,
      display:
        r.tags?.name ||
        r.tags?.operator ||
        r.tags?.brand ||
        r.tags?.amenity ||
        "Recycling Center",
      address:
        `${r.tags?.["addr:street"] || ""} ${r.tags?.["addr:city"] || ""}` ||
        "Address not available",
    }));

    return NextResponse.json(enriched);
  } catch {
    return NextResponse.json([]);
  }
}
