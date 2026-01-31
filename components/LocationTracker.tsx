"use client";
import { useEffect, useState } from "react";

export default function LocationTracker() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });

        // Store locally for now
        localStorage.setItem(
          "userLocation",
          JSON.stringify({ latitude, longitude })
        );
      },
      () => alert("Location access denied.")
    );
  }, []);

  return location ? null : (
    <div className="bg-yellow-100 text-yellow-800 text-center py-2">
      📍 We use your location to find nearby recyclers
    </div>
  );
}
