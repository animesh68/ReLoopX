import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lat, lng } = await req.json();

  // Overpass for recycling nodes
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
      body: query,
    }
  );

  const overData = await overpass.json();

  // Reverse geocode names
  const results = await Promise.all(
    overData.elements.slice(0, 5).map(async (r: any) => {
      const geo = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${r.lat}&lon=${r.lon}&format=json`
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
    })
  );

  return NextResponse.json(results);
}
