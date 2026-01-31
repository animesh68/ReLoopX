"use client";
import { useState } from "react";

export default function UploadWasteSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">
        Upload Your Waste
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Generate a smart waste ticket and connect with recycling partners.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Upload Waste
      </button>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white text-gray-900 w-full max-w-lg rounded-xl p-6 relative shadow-xl animate-fadeIn">


            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Generate Waste Ticket
            </h3>

            <form className="space-y-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full mt-1"
                />
              </div>

              {/* Waste Type */}
              <div>
                <label className="block text-sm font-medium">Waste Type</label>
                <select className="w-full mt-1 border rounded-lg p-2">
                  <option>Organic</option>
                  <option>Metals</option>
                  <option>E-Waste</option>
                  <option>Plastic</option>
                  <option>Glass</option>
                  <option>Paper</option>
                  <option>Others</option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium">
                  Pickup Urgency
                </label>
                <select className="w-full mt-1 border rounded-lg p-2">
                  <option>Within 1 day</option>
                  <option>2–3 days</option>
                  <option>4–5 days</option>
                  <option>Within a week</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium">Your Location</label>
                <input
                  type="text"
                  placeholder="Enter your area / city"
                  className="w-full mt-1 border rounded-lg p-2"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Generate Waste Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
