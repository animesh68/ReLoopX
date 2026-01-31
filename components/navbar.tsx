"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          ReLoop<span className="text-gray-800">X</span>
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">



          <Link
            href="/UploadWasteSection.tsx"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow">
          <Link
            href="/upload"
            className="block bg-green-600 text-black px-4 py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
            onClick={() => setOpen(false)}
          >
            Upload Waste
          </Link>

          <Link
            href="/upload"
            className="block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
