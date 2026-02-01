import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { category: "organic", price: 3 },
    { category: "plastic", price: 15 },
    { category: "ewaste", price: 120 },
    { category: "metal", price: 45 },
    { category: "glass", price: 10 },
    { category: "paper", price: 7 }
  ]);
}
