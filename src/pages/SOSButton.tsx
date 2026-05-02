/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSendSOSMutation } from "@/redux/features/sos/sos.api";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";

export default function SOSButton() {
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
  });
  const [message, setMessage] = useState("");
  const [sendSOS] = useSendSOSMutation();

  const handleSOS = async () => {
    // Default coordinates if location is not available
    const lat = coords?.latitude ?? 23.8103;
    const lng = coords?.longitude ?? 90.4125;

    const payload = {
      message: `EMERGENCY! Need help at https://maps.google.com/?q=${lat},${lng}`,
      lat,
      lng,
    };

    try {
      await sendSOS(payload).unwrap();
      setMessage("✅ SOS alert sent successfully!");
    } catch (err: any) {
      console.error("SOS Error:", err);
      setMessage(err?.data?.message || "❌ Failed to send SOS alert.");
    }
  };

  return (
    <>
      <button
        onClick={handleSOS}
        className="fixed bottom-8 right-8 z-50 bg-red-600 text-white p-4 rounded-full shadow-xl hover:bg-red-700 transition"
      >
        🚨 SOS
      </button>
      {message && (
        <div className="fixed bottom-24 right-8 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded shadow">
          {message}
        </div>
      )}
    </>
  );
}
