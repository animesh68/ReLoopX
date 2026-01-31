"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("preAuthProfile", JSON.stringify(form));
    signIn("google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center text-green-700">
          Join ReLoopX
        </h1>

        <input
          required
          placeholder="Full Name"
          className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border border-gray-300 p-3 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="recycler">Recycler</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
