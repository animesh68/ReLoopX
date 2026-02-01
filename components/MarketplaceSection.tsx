"use client";
import { useEffect, useState } from "react";

type Rate = {
  category: string;
  price: number;
};

export default function MarketplaceSection({ detectedType }: { detectedType: string }) {
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    fetch("/api/marketplace")
      .then(res => res.json())
      .then(data => {
        // normalize
        if (Array.isArray(data)) setRates(data);
        else if (Array.isArray(data.rates)) setRates(data.rates);
        else setRates([]);
      });
  }, []);

  const filtered = rates.filter(r => r.category === detectedType);

  return (
    <section className="py-20 bg-gray-50 text-black">
      <h2 className="text-3xl font-bold text-center mb-6">Marketplace Value</h2>

      {filtered.length === 0 ? (
        <p className="text-center">No pricing available for {detectedType}</p>
      ) : (
        <div className="max-w-xl mx-auto space-y-4">
          {filtered.map((r, i) => (
            <div key={i} className="p-4 bg-white shadow rounded">
              ₹ {r.price} / kg
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
