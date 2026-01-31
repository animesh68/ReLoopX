"use client";
import { useState } from "react";

export default function UploadWasteSection() {
  const [file, setFile] = useState<File | null>(null);
  const [detected, setDetected] = useState("");
  const [quantity, setQuantity] = useState("");
  const [urgency, setUrgency] = useState("1-2 days");
  const [recyclers, setRecyclers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleProcess = async () => {
    if (!file || !quantity) return alert("Upload image & quantity");
    setLoading(true);

    try {
      const base64 = (await toBase64(file)).split(",")[1];

      const visionRes = await fetch("/api/classify", {
        method: "POST",
        body: JSON.stringify({ image: base64 }),
      });
      const visionData = await visionRes.json();
      setDetected(visionData.category);

      navigator.geolocation.getCurrentPosition(async (pos) => {
        const recRes = await fetch("/api/recyclers", {
          method: "POST",
          body: JSON.stringify({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        });

        const recData = await recRes.json();
        setRecyclers(recData || []);

        const record = {
          detectedType: visionData.category,
          quantity,
          urgency,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          recyclers: recData,
          time: new Date().toISOString(),
        };

        const prev = JSON.parse(localStorage.getItem("wasteLogs") || "[]");
        localStorage.setItem("wasteLogs", JSON.stringify([...prev, record]));

        setLoading(false);
      });
    } catch {
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50 text-black text-center">
      <h2 className="text-4xl font-bold mb-4">Smart Waste Detection</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />

      <input
        placeholder="Quantity (eg: 2kg)"
        className="border p-2 rounded w-60 mb-3"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <select
        className="border p-2 rounded w-60 mb-4"
        value={urgency}
        onChange={(e) => setUrgency(e.target.value)}
      >
        <option>1-2 days</option>
        <option>3-5 days</option>
        <option>Within a week</option>
      </select>

      <br />

      <button
        onClick={handleProcess}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Detect & Find Recyclers
      </button>

      {loading && <p className="mt-4">Processing...</p>}

      {detected && (
        <p className="font-bold mt-4">
          Detected Waste Type:{" "}
          <span className="text-green-700">{detected}</span>
        </p>
      )}

      {recyclers.length > 0 && (
        <div className="mt-8 max-w-xl mx-auto">
          <h3 className="font-semibold mb-2">Nearby Recyclers:</h3>
          {recyclers.map((r, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded shadow mb-2 text-left"
            >
              <p className="font-bold">{r.display}</p>
              <p className="text-sm text-gray-700">{r.address}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
