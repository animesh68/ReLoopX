"use client";

export default function RecyclingRoute({ type }: { type: string }) {
  if (!type) return null;

  const ROUTES: Record<string, string[]> = {
    Organic: ["Home", "Composting Unit", "Bio-Gas Plant", "Fertilizer"],
    Recyclable: ["Home", "Scrap Dealer", "Sorting Facility", "Recycling Plant", "New Product"],
    "E-Waste": ["Home", "Authorized E-Waste Center", "Dismantling Unit", "Metal Recovery"],
    Construction: ["Site", "Debris Plant", "Crushing", "Road Base"],
    Other: ["Home", "Waste Collection", "Landfill"],
  };

  const path = ROUTES[type] || ROUTES.Other;

  return (
    <div className="flex justify-center gap-6 mt-10 flex-wrap">
      {path.map((p, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="px-4 py-2 bg-green-100 rounded shadow">
            {p}
          </div>
          {i !== path.length - 1 && <span>➡️</span>}
        </div>
      ))}
    </div>
  );
}
