import { NextResponse } from "next/server";

const WASTE_KEYWORDS: Record<string, string[]> = {
  organic: ["food", "banana", "apple", "vegetable", "fruit", "bread"],
  plastic: ["bottle", "plastic", "container", "bag", "wrapper"],
  metal: ["can", "tin", "steel", "aluminium", "iron"],
  glass: ["glass", "jar", "bottle"],
  ewaste: ["phone", "laptop", "circuit", "battery", "charger"],
  paper: ["paper", "cardboard", "box", "newspaper"],
};

function normalize(label: string) {
  const lower = label.toLowerCase();
  for (const [type, words] of Object.entries(WASTE_KEYWORDS)) {
    if (words.some((w) => lower.includes(w))) return type;
  }
  return "other";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    // Fake AI detection for demo
    const filename = file.name.toLowerCase();
    const bestLabel = filename.split(".")[0] || "waste";

    return NextResponse.json({
      raw: bestLabel,
      type: normalize(bestLabel),
    });
  } catch (err) {
    return NextResponse.json({ error: "Classification failed" }, { status: 500 });
  }
}
