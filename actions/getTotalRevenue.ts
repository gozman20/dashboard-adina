import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const getTotalRevenue = async () => {
  try {
    const paidReservation = await prismadb.reservation.findMany({
      where: {
        isPaid: true,
      },
      include: {
        bookedRoom: {
          include: {
            room: true,
          },
        },
      },
    });

    const totalRevenue = paidReservation.reduce((total, order) => {
      const orderTotal = order.bookedRoom.reduce((orderSum, item) => {
        return orderSum + item.room.price.toNumber();
      }, 0);
      return total + orderTotal;
    }, 0);
    return totalRevenue;
  } catch (err) {
    console.log(err);
  }
};
