"use client";
import { useState } from "react";

type Recycler = {
  name: string;
  lat: number;
  lon: number;
};

export default function UploadWasteSection() {
  const [file, setFile] = useState<File | null>(null);
  const [weight, setWeight] = useState("");
  const [urgency, setUrgency] = useState("1-2 days");
  const [detected, setDetected] = useState<string | null>(null);
  const [recyclers, setRecyclers] = useState<Recycler[]>([]);
  const [loading, setLoading] = useState(false);

  const detectAndFind = async () => {
    if (!file) return alert("Please upload an image");

    setLoading(true);
    setDetected(null);
    setRecyclers([]);

    const form = new FormData();
    form.append("file", file);

    const classifyRes = await fetch("/api/classify", {
      method: "POST",
      body: form,
    });

    const classifyData = await classifyRes.json();
    setDetected(classifyData.type || "Unknown");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const res = await fetch("/api/recyclers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      });

      const data = await res.json();
      setRecyclers(data || []);
      setLoading(false);
    });
  };

  return (
    <section className="py-24 bg-black text-gray-200">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-2 text-white">
          Smart Waste Detection
        </h2>
        <p className="text-gray-400 mb-10">
          Upload waste → AI detects → nearest recyclers found
        </p>

        <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-2xl shadow-lg space-y-4 text-left">
          <div>
            <label className="block text-sm mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-black border border-zinc-700 text-white rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Weight (kg)</label>
            <input
              type="number"
              placeholder="e.g. 2"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-black border border-zinc-700 text-white rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Urgency</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full bg-black border border-zinc-700 text-white rounded-lg p-2"
            >
              <option>Within 24 hours</option>
              <option>1-2 days</option>
              <option>3-5 days</option>
              <option>Within a week</option>
            </select>
          </div>

          <button
            onClick={detectAndFind}
            disabled={loading}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Detecting..." : "Detect & Find Recyclers"}
          </button>
        </div>

        {detected && (
          <p className="mt-8 text-lg">
            Detected Waste Type:{" "}
            <span className="font-semibold text-green-400">
              {detected}
            </span>
          </p>
        )}

        {recyclers.length > 0 && (
          <div className="mt-10 space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              Nearby Recyclers
            </h3>
            {recyclers.map((r, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow"
              >
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-gray-400">
                  {r.lat}, {r.lon}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
