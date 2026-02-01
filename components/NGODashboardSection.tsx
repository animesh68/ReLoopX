"use client";
import { useState } from "react";

export default function NGODashboardSection() {
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);

  return (
    <section className="py-24 bg-black text-center text-gray-200">
      <h2 className="text-4xl font-bold mb-4 text-white">
        Partner with NGOs for a Cleaner Future
      </h2>

      <p className="text-gray-400 max-w-3xl mx-auto mb-10">
        Our NGO partners work on waste management, recycling awareness,
        clean-up drives, and sustainable resource recovery. Your support helps
        reduce landfill overflow, empower communities, and protect the planet.
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => setSponsorOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Sponsor Waste Drive
        </button>

        <button
          onClick={() => setFundOpen(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          Fund Recycling
        </button>
      </div>

      {sponsorOpen && (
        <Modal onClose={() => setSponsorOpen(false)} title="Sponsor a Waste Drive">
          <FormSponsor />
        </Modal>
      )}

      {fundOpen && (
        <Modal onClose={() => setFundOpen(false)} title="Fund Recycling Initiative">
          <FormFund />
        </Modal>
      )}
    </section>
  );
}

/* ---------- Reusable Modal ---------- */
function Modal({ title, onClose, children }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
      <div className="bg-zinc-900 border border-zinc-700 text-gray-200 w-full max-w-lg rounded-xl p-6 relative shadow-2xl animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-xl text-gray-300 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        {children}
      </div>
    </div>
  );
}

/* ---------- Sponsor Form ---------- */
function FormSponsor() {
  return (
    <form className="space-y-4">
      <Input label="Organization Name" placeholder="Enter your organization" />
      <Input label="Contact Email" placeholder="example@email.com" />
      <Input label="City / Area" placeholder="Where will the drive happen?" />

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Type of Drive
        </label>
        <select className="w-full mt-1 bg-black border border-zinc-700 rounded-lg p-2 text-white">
          <option>Community Clean-Up</option>
          <option>School Awareness Drive</option>
          <option>Corporate Waste Drive</option>
          <option>Public Area Clean-Up</option>
        </select>
      </div>

      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
        Submit Sponsorship Request
      </button>
    </form>
  );
}

/* ---------- Fund Form ---------- */
function FormFund() {
  return (
    <form className="space-y-4">
      <Input label="Full Name" placeholder="Your name" />
      <Input label="Email" placeholder="your@email.com" />

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Select Amount
        </label>
        <select className="w-full mt-1 bg-black border border-zinc-700 rounded-lg p-2 text-white">
          <option>₹500</option>
          <option>₹1000</option>
          <option>₹5000</option>
          <option>Custom</option>
        </select>
      </div>

      <Input label="Purpose (optional)" placeholder="Why are you funding?" />

      <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
        Proceed to Fund
      </button>
    </form>
  );
}

/* ---------- Input Component ---------- */
function Input({ label, placeholder }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 bg-black border border-zinc-700 rounded-lg p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
