import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lat, lng } = body;

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Missing coordinates" },
        { status: 400 }
      );
    }

    const query = `
      [out:json];
      (
        node["amenity"="recycling"](around:5000,${lat},${lng});
      );
      out;
    `;

    const overpass = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: query,
      }
    );

    if (!overpass.ok) {
      throw new Error("Overpass API failed");
    }

    const overData = await overpass.json();

    if (!overData.elements?.length) {
      return NextResponse.json([]);
    }

    const results = await Promise.all(
      overData.elements.slice(0, 5).map(async (r: any) => {
        try {
          const geo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${r.lat}&lon=${r.lon}&format=json`,
            { headers: { "User-Agent": "reloopx-hackathon" } }
          );
          const geoData = await geo.json();

          return {
            name:
              geoData?.name ||
              geoData?.address?.road ||
              "Local Recycling Center",
            lat: r.lat,
            lon: r.lon,
          };
        } catch {
          return {
            name: "Local Recycling Center",
            lat: r.lat,
            lon: r.lon,
          };
        }
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error("Recycler API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch recyclers" },
      { status: 500 }
    );
  }
}
