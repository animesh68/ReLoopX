import { NextResponse } from "next/server";

const MAP: Record<string, string> = {
  bottle: "Recyclable",
  plastic: "Recyclable",
  paper: "Recyclable",
  cardboard: "Recyclable",
  food: "Organic",
  banana: "Organic",
  apple: "Organic",
  electronics: "E-Waste",
  phone: "E-Waste",
  laptop: "E-Waste",
  battery: "E-Waste",
  brick: "Construction",
  cement: "Construction",
  metal: "Recyclable",
};

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const res = await fetch(
      "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: image }),
      }
    );

    const data = await res.json();
    const raw = data?.[0]?.label?.toLowerCase() || "unknown";

    let category = "Other";
    Object.keys(MAP).forEach((k) => {
      if (raw.includes(k)) category = MAP[k];
    });

    return NextResponse.json({ raw, category });
  } catch {
    return NextResponse.json({ error: "Classification failed" });
  }
}

