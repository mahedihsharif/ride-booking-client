import RideRequestModal from "@/pages/driver/RideRequestModal";
import { useGetRequestRidesQuery } from "@/redux/features/auth/driver.api";
import { useEffect, useState } from "react";

export default function RideRequestHandler() {
  const { data } = useGetRequestRidesQuery();
  const [openModal, setOpenModal] = useState(false);

  // Auto open modal when new requests arrive
  useEffect(() => {
    if (data && data?.data?.rides?.length > 0) {
      setOpenModal(true);
    }
  }, [data]);

  return (
    <>
      {data && data?.data?.rides?.length > 0 && openModal && (
        <RideRequestModal rides={data?.data?.rides} />
      )}
    </>
  );
}
