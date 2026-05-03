import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { activeStatus } from "@/constants/admin.constant";
import RideRequestModal from "@/pages/driver/RideRequestModal";
import { useDriverInfoQuery } from "@/redux/features/auth/driver.api";
import { useGetRequestRidesQuery } from "@/redux/features/auth/driver.api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function RideRequestHandler() {
    const { data: driverData } = useDriverInfoQuery(undefined);
    const driverStatus = driverData?.data?.isApprovedStatus;
    // Skip fetching rides if driver is pending - backend won't return any anyway
    const { data } = useGetRequestRidesQuery(undefined, {
        skip: driverStatus === activeStatus.PENDING,
    });
    const [openModal, setOpenModal] = useState(false);
    const [hasShownPendingMessage, setHasShownPendingMessage] = useState(false);
    // Show message to pending drivers once
    useEffect(() => {
        if (driverStatus === activeStatus.PENDING && !hasShownPendingMessage) {
            toast.info("Your driver account is pending approval. You'll be able to receive rides once approved by an admin.");
            setHasShownPendingMessage(true);
        }
        else if (driverStatus === activeStatus.APPROVED) {
            setHasShownPendingMessage(false);
        }
    }, [driverStatus, hasShownPendingMessage]);
    // Auto open modal when new requests arrive
    useEffect(() => {
        if (data && data?.data?.rides?.length > 0) {
            setOpenModal(true);
        }
    }, [data]);
    return (_jsx(_Fragment, { children: data && data?.data?.rides?.length > 0 && openModal && (_jsx(RideRequestModal, { rides: data?.data?.rides })) }));
}
