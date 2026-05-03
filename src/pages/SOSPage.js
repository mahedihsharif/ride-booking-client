import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useSendSMSMutation, useSendWhatsAppMutation, } from "@/redux/features/sms/sms.api";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
export default function SOSPage() {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
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
        }
        catch (err) {
            console.error(err);
            setMessage("Failed to send alert. Try again.");
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-6 text-red-600 dark:text-red-400", children: "Emergency / SOS" }), _jsx(Button, { onClick: handleSOS, className: "bg-red-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-red-700 transition mb-4", children: "\uD83D\uDEA8 Send SOS" }), message && (_jsx("p", { className: "mt-4 text-lg text-gray-800 dark:text-gray-200", children: message })), coords && (_jsx("div", { className: "w-full max-w-3xl mt-8 h-96", children: _jsxs(MapContainer, { center: [coords.latitude, coords.longitude], zoom: 16, className: "h-full w-full rounded-xl shadow-lg", children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), _jsx(Marker, { position: [coords.latitude, coords.longitude], children: _jsx(Popup, { children: "Your current location" }) })] }) })), !isGeolocationAvailable && (_jsx("p", { children: "Your browser does not support Geolocation" })), !isGeolocationEnabled && _jsx("p", { children: "Please enable location services" })] }));
}
