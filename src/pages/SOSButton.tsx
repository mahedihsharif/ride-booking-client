/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  useSendSMSMutation,
  useSendWhatsAppMutation,
} from "@/redux/features/sms/sms.api";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";

export default function SOSButton() {
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
  });
  const [message, setMessage] = useState("");
  const [sendSMS] = useSendSMSMutation();
  const [sendWhatsApp] = useSendWhatsAppMutation();

  const handleSOS = async () => {
    if (!coords) {
      setMessage("Location not available. Allow location access!");
      return;
    }

    const payload = {
      message: `EMERGENCY! Need help at https://maps.google.com/?q=${coords.latitude},${coords.longitude}`,
      to: "+880123456789",
    };

    try {
      await sendSMS(payload);
      await sendWhatsApp(payload);
      setMessage("SOS alert sent successfully!");
    } catch (err) {
      setMessage("Failed to send SOS alert.");
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
