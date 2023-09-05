import React from "react";
import { ReservationClient } from "./components/ReservationClient";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const ReservationPage = async () => {
  const reservation = await prismadb.reservation.findMany({
    include: {
      bookedRoom: {
        include: { room: true },
      },
    },
  });

  const formattedReservation = reservation.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,

    isPaid: item.isPaid,
    roomNumber: item.bookedRoom.map((item) => item.room.name).join(", "),
    startDate: format(item.startDate, "do, MMMM,yyyy"),
    endDate: format(item.endDate, "do, MMMM,yyyy"),
    totalPrice: item.totalPrice,
  }));
  return (
    <div className="space-y-4 p-8 pt-6">
      <ReservationClient data={formattedReservation} />
    </div>
  );
};

export default ReservationPage;
