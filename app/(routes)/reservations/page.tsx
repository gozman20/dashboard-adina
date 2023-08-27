import React from "react";
import { ReservationClient } from "./components/ReservationClient";
import prismadb from "@/lib/prismadb";

const ReservationPage = async () => {
  const reservation = await prismadb.reservation.findMany({
    include: {
      room: {
        select: {
          name: true,
        },
      },
    },
  });

  const formattedReservation = reservation.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    isPaid: item.isPaid,
    roomNumber: item.room.name,
    startDate: item.startDate.toISOString(),
    endDate: item.endDate.toISOString(),
    totalPrice: item.totalPrice,
  }));
  return (
    <div className="space-y-4 p-8 pt-6">
      <ReservationClient data={formattedReservation} />
    </div>
  );
};

export default ReservationPage;
