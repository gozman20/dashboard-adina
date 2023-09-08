import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const getTotalRoomsBooked = async () => {
  try {
    const paidReservation = await prismadb.reservation.count();
    return paidReservation;
  } catch (err) {
    console.log(err);
  }
};
