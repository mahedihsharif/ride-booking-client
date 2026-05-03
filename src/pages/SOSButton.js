import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
        }
        catch (err) {
            console.error("SOS Error:", err);
            setMessage(err?.data?.message || "❌ Failed to send SOS alert.");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleSOS, className: "fixed bottom-8 right-8 z-50 bg-red-600 text-white p-4 rounded-full shadow-xl hover:bg-red-700 transition", children: "\uD83D\uDEA8 SOS" }), message && (_jsx("div", { className: "fixed bottom-24 right-8 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded shadow", children: message }))] }));
}
