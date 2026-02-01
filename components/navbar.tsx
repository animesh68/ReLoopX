"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black/80 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-400">
          ReLoop<span className="text-white">X</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-4 items-center">
          {session && (
            <span className="text-gray-300 font-medium">
              Hi, {session.user?.name?.split(" ")[0]} 👋
            </span>
          )}

          <Link
            href="/uploadwasteselection"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Upload Waste
          </Link>

          {!session ? (
            <Link
              href="/auth"
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Get Started
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-zinc-900 px-4 pb-4 space-y-3 shadow-lg">
          {session && (
            <p className="text-center text-gray-300">
              Hi, {session.user?.name?.split(" ")[0]} 👋
            </p>
          )}

          <Link
            href="/uploadwasteselection"
            className="block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
            onClick={() => setOpen(false)}
          >
            Upload Waste
          </Link>

          {!session ? (
            <Link
              href="/auth"
              className="block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          ) : (
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
