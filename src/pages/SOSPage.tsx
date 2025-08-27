/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  useSendSMSMutation,
  useSendWhatsAppMutation,
} from "@/redux/features/sms/sms.api";
// RTK Query
import type { LatLngExpression } from "leaflet";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function SOSPage() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      watchPosition: true,
      userDecisionTimeout: 5000,
    });

  const [message, setMessage] = useState("");
  const [sendSMS] = useSendSMSMutation();
  const [sendWhatsApp] = useSendWhatsAppMutation();

  const handleSOS = async () => {
    if (!coords) {
      setMessage("Location not available. Please allow location access.");
      return;
    }

    const lat = coords.latitude;
    const lng = coords.longitude;
    const emergencyMessage = `🚨 SOS! I need help. My location: https://www.google.com/maps?q=${lat},${lng}`;

    try {
      await sendSMS({
        to: "+8801XXXXXXXXX",
        message: emergencyMessage,
      }).unwrap();
      await sendWhatsApp({
        to: "+8801700772420",
        message: emergencyMessage,
      }).unwrap();
      setMessage("Emergency alert sent successfully!");
    } catch (err: any) {
      console.error(err);
      setMessage("Failed to send alert. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-600 dark:text-red-400">
        Emergency / SOS
      </h1>

      <Button
        onClick={handleSOS}
        className="bg-red-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-red-700 transition mb-4"
      >
        🚨 Send SOS
      </Button>

      {message && (
        <p className="mt-4 text-lg text-gray-800 dark:text-gray-200">
          {message}
        </p>
      )}

      {coords && (
        <div className="w-full max-w-3xl mt-8 h-96">
          <MapContainer
            center={[coords.latitude, coords.longitude] as LatLngExpression}
            zoom={16}
            className="h-full w-full rounded-xl shadow-lg"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[coords.latitude, coords.longitude] as LatLngExpression}
            >
              <Popup>Your current location</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {!isGeolocationAvailable && (
        <p>Your browser does not support Geolocation</p>
      )}
      {!isGeolocationEnabled && <p>Please enable location services</p>}
    </div>
  );
}
